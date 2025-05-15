import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import Input from './ui/Input';
import TextArea from './ui/TextArea';
import MultiSelect from './ui/MultiSelect';
import Button from './ui/Button';
import { TECHNOLOGIES } from '../../types';
import { User, MapPin, Mail, Globe, Github, Twitter, Linkedin, Upload, Trash2 } from 'lucide-react';
import { Modal } from '../common/Modal';

const ProfileForm: React.FC = () => {
  const { profile, updateProfile } = useProfile();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    title: profile?.title || '',
    bio: profile?.bio || '',
    avatar: profile?.avatar || '',
    location: profile?.location || '',
    email: profile?.email || '',
    website: profile?.website || '',
    github: profile?.github || '',
    twitter: profile?.twitter || '',
    linkedin: profile?.linkedin || '',
    skills: profile?.skills || [],
    projects: profile?.projects || []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProfilePictureModalOpen, setIsProfilePictureModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (skills: string[]) => {
    setFormData(prev => ({ ...prev, skills }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    updateProfile({
      ...formData,
      projects: formData.projects || []
    });
    navigate('/projects');
  };

  const handleDeleteProfilePicture = () => {
    setFormData(prev => ({ ...prev, avatar: '' }));
    setIsProfilePictureModalOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
    setIsProfilePictureModalOpen(false);
  };

  const defaultAvatar = 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80';

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Profile</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              error={errors.name}
              fullWidth
              required
            />
            
            <Input
              label="Professional Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Full Stack Developer"
              error={errors.title}
              fullWidth
              required
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-3">
              <User size={18} className="text-gray-500" />
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
            </div>
            <div 
              className="relative group cursor-pointer"
              onClick={() => setIsProfilePictureModalOpen(true)}
            >
              <img 
                src={formData.avatar || defaultAvatar} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-200 transition-all duration-200 group-hover:opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-black bg-opacity-50 rounded-full p-3">
                  <Upload className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <TextArea
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself, your experience, and what you're passionate about"
          error={errors.bio}
          fullWidth
          required
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center space-x-2">
              <MapPin size={18} className="text-gray-500" />
              <Input
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                fullWidth
              />
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <Mail size={18} className="text-gray-500" />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                error={errors.email}
                fullWidth
                required
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center space-x-2">
              <Globe size={18} className="text-gray-500" />
              <Input
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
                fullWidth
              />
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <Github size={18} className="text-gray-500" />
              <Input
                label="GitHub"
                name="github"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/yourusername"
                fullWidth
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center space-x-2">
              <Twitter size={18} className="text-gray-500" />
              <Input
                label="Twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/yourusername"
                fullWidth
              />
            </div>
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <Linkedin size={18} className="text-gray-500" />
              <Input
                label="LinkedIn"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourusername"
                fullWidth
              />
            </div>
          </div>
        </div>
        
        <div>
          <MultiSelect
            label="Skills & Technologies"
            options={TECHNOLOGIES}
            selectedValues={formData.skills}
            onChange={handleSkillsChange}
            placeholder="Select or type to add skills"
          />
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate('/builder')}
          >
            Cancel
          </Button>
          <Button type="submit">
            Save & Continue
          </Button>
        </div>
      </form>

      {/* Profile Picture Modal */}
      <Modal
        isOpen={isProfilePictureModalOpen}
        onClose={() => setIsProfilePictureModalOpen(false)}
        title="Profile Picture"
        size="md"
      >
        <div className="space-y-6">
          <div className="flex justify-center">
            <img 
              src={formData.avatar || defaultAvatar} 
              alt="Profile" 
              className="w-48 h-48 rounded-full object-cover border-2 border-gray-200"
            />
          </div>
          
          <div className="flex flex-col space-y-3">
            <label className="relative flex items-center justify-center p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors">
              <Upload className="h-5 w-5 mr-2" />
              <span>Upload New Picture</span>
              <input 
                type="file" 
                accept="image/*" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                onChange={handleFileUpload}
              />
            </label>
            
            <button
              type="button"
              onClick={handleDeleteProfilePicture}
              className="flex items-center justify-center p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Trash2 className="h-5 w-5 mr-2 text-red-500" />
              <span>Remove Picture</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileForm;
