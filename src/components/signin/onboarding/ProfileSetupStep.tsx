import React, { useState } from 'react'
import { User, ArrowRight, ArrowLeft, Upload, X, Mail, Globe, Twitter, MessageCircle, MessageSquare, Slack, Linkedin, Github } from 'lucide-react'
import { AlertModal } from '../../common/AlertModal'

interface ProfileSetupStepProps {
  userData: {
    name: string
    username: string
    bio: string
    avatar: string
    email: string
    github: string
    twitter: string
    telegram: string
    slack: string
    discord: string
    linkedin: string
    website: string
  }
  updateUserData: (data: Partial<typeof userData>) => void
  onNext: () => void
  onBack: () => void
  onCancel: () => void
}

export const ProfileSetupStep: React.FC<ProfileSetupStepProps> = ({ 
  userData, 
  updateUserData, 
  onNext, 
  onBack,
  onCancel
}) => {
  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: ''
  })
  
  const [showUploadAlert, setShowUploadAlert] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple validation
    const newErrors = {
      name: userData.name ? '' : 'Name is required',
      username: userData.username ? '' : 'Username is required',
      email: userData.email ? (isValidEmail(userData.email) ? '' : 'Please enter a valid email address') : 'Email is required'
    }
    
    setErrors(newErrors)
    
    if (!newErrors.name && !newErrors.username && !newErrors.email) {
      onNext()
    }
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const avatarOptions = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  ]

  return (
    <div>
      <div className="absolute top-4 right-4">
        <button 
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Cancel"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Profile</h2>
      <p className="text-gray-600 mb-6">Tell us a bit about yourself so others can get to know you better.</p>
      
      <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[70vh] pr-2">
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Profile Picture</label>
          <div className="flex flex-wrap gap-4 mb-2">
            {avatarOptions.map((avatar, index) => (
              <div 
                key={index}
                className={`relative cursor-pointer rounded-full overflow-hidden border-2 ${
                  userData.avatar === avatar ? 'border-indigo-600' : 'border-transparent'
                }`}
                onClick={() => updateUserData({ avatar })}
              >
                <img 
                  src={avatar} 
                  alt={`Avatar option ${index + 1}`} 
                  className="h-16 w-16 object-cover"
                />
                {userData.avatar === avatar && (
                  <div className="absolute inset-0 bg-indigo-600 bg-opacity-20 flex items-center justify-center">
                    <div className="bg-indigo-600 rounded-full p-1">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div 
              className="h-16 w-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400"
              onClick={() => setShowUploadAlert(true)}
            >
              <Upload className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="name"
            value={userData.name}
            onChange={(e) => updateUserData({ name: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } bg-white text-gray-900`}
            placeholder="Enter your full name"
            required
          />
          {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username <span className="text-red-500">*</span></label>
          <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
            <span className="bg-gray-100 px-3 py-2 text-gray-500 border-r border-gray-300 flex items-center">@</span>
            <input
              type="text"
              id="username"
              value={userData.username}
              onChange={(e) => updateUserData({ username: e.target.value })}
              className="flex-1 px-4 py-2 focus:outline-none bg-white text-gray-900"
              placeholder="Choose a username"
              required
              autoComplete="username"
              style={{
                WebkitTextFillColor: '#111827',
                caretColor: '#111827',
                '::placeholder': {
                  color: '#9ca3af'
                }
              }}
            />
          </div>
          {errors.username && <p className="mt-1 text-red-500 text-sm">{errors.username}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address <span className="text-red-500">*</span></label>
          <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
            <span className="bg-gray-100 px-3 py-2 text-gray-500 border-r border-gray-300 flex items-center justify-center w-10">
              <Mail className="h-5 w-5" />
            </span>
            <input
              type="email"
              id="email"
              value={userData.email}
              onChange={(e) => updateUserData({ email: e.target.value })}
              className="flex-1 px-4 py-2 focus:outline-none bg-white text-gray-900"
              placeholder="your.email@example.com"
              required
              autoComplete="email"
            />
          </div>
          {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
        </div>
        
        <div className="mb-6">
          <label htmlFor="bio" className="block text-gray-700 font-medium mb-2">Bio <span className="text-gray-400 text-sm font-normal">(optional)</span></label>
          <textarea
            id="bio"
            value={userData.bio}
            onChange={(e) => updateUserData({ bio: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
            placeholder="Tell us a bit about yourself"
            rows={3}
          />
        </div>
        
        <div className="mb-6">
          <h3 className="text-gray-700 font-medium mb-4">Social Profiles <span className="text-gray-400 text-sm font-normal">(optional)</span></h3>
          
          <div className="space-y-4">
            <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
              <span className="bg-gray-100 px-3 py-2 text-gray-500 border-r border-gray-300 flex items-center justify-center w-10">
                <Github className="h-5 w-5" />
              </span>
              <input
                type="text"
                id="github"
                value={userData.github}
                onChange={(e) => updateUserData({ github: e.target.value })}
                className="flex-1 px-4 py-2 focus:outline-none bg-white text-gray-900"
                placeholder="GitHub username"
              />
            </div>
            
            <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
              <span className="bg-gray-100 px-3 py-2 text-gray-500 border-r border-gray-300 flex items-center justify-center w-10">
                <Twitter className="h-5 w-5" />
              </span>
              <input
                type="text"
                id="twitter"
                value={userData.twitter}
                onChange={(e) => updateUserData({ twitter: e.target.value })}
                className="flex-1 px-4 py-2 focus:outline-none bg-white text-gray-900"
                placeholder="X (Twitter) username"
              />
            </div>
            
            <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
              <span className="bg-gray-100 px-3 py-2 text-gray-500 border-r border-gray-300 flex items-center justify-center w-10">
                <MessageCircle className="h-5 w-5" />
              </span>
              <input
                type="text"
                id="telegram"
                value={userData.telegram}
                onChange={(e) => updateUserData({ telegram: e.target.value })}
                className="flex-1 px-4 py-2 focus:outline-none bg-white text-gray-900"
                placeholder="Telegram username"
              />
            </div>
            
            <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
              <span className="bg-gray-100 px-3 py-2 text-gray-500 border-r border-gray-300 flex items-center justify-center w-10">
                <Slack className="h-5 w-5" />
              </span>
              <input
                type="text"
                id="slack"
                value={userData.slack}
                onChange={(e) => updateUserData({ slack: e.target.value })}
                className="flex-1 px-4 py-2 focus:outline-none bg-white text-gray-900"
                placeholder="Slack handle"
              />
            </div>
            
            <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
              <span className="bg-gray-100 px-3 py-2 text-gray-500 border-r border-gray-300 flex items-center justify-center w-10">
                <MessageSquare className="h-5 w-5" />
              </span>
              <input
                type="text"
                id="discord"
                value={userData.discord}
                onChange={(e) => updateUserData({ discord: e.target.value })}
                className="flex-1 px-4 py-2 focus:outline-none bg-white text-gray-900"
                placeholder="Discord username"
              />
            </div>
            
            <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
              <span className="bg-gray-100 px-3 py-2 text-gray-500 border-r border-gray-300 flex items-center justify-center w-10">
                <Linkedin className="h-5 w-5" />
              </span>
              <input
                type="text"
                id="linkedin"
                value={userData.linkedin}
                onChange={(e) => updateUserData({ linkedin: e.target.value })}
                className="flex-1 px-4 py-2 focus:outline-none bg-white text-gray-900"
                placeholder="LinkedIn username"
              />
            </div>
            
            <div className="flex rounded-lg overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
              <span className="bg-gray-100 px-3 py-2 text-gray-500 border-r border-gray-300 flex items-center justify-center w-10">
                <Globe className="h-5 w-5" />
              </span>
              <input
                type="text"
                id="website"
                value={userData.website}
                onChange={(e) => updateUserData({ website: e.target.value })}
                className="flex-1 px-4 py-2 focus:outline-none bg-white text-gray-900"
                placeholder="Your website URL"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 font-medium py-2 px-4"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </button>
            
            <button
              type="button"
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
          
          <button
            type="submit"
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Continue
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
      
      {/* Upload alert */}
      <AlertModal
        isOpen={showUploadAlert}
        onClose={() => setShowUploadAlert(false)}
        title="Upload Feature"
        message="Custom avatar upload is not available in this preview. Please select one of the provided avatars."
        type="info"
      />
    </div>
  )
}
