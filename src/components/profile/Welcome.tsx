import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { Briefcase, User, Eye, ArrowRight } from 'lucide-react';

const Button = ({ 
  onClick, 
  variant = 'primary', 
  disabled = false, 
  className = '', 
  children 
}: { 
  onClick?: () => void; 
  variant?: 'primary' | 'outline'; 
  disabled?: boolean; 
  className?: string; 
  children: React.ReactNode;
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} text-sm px-4 py-2 ${disabledClasses} ${className}`;
  
  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

const Welcome: React.FC = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  
  const hasProfile = profile && profile.name && profile.email;
  const hasProjects = profile && profile.projects && profile.projects.length > 0;
  
  const handleSaveAndExit = () => {
    // Navigate to the community page
    navigate('/community');
  };
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Builder Portfolio</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Create a beautiful portfolio to showcase your projects and skills to the world
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h2 className="text-2xl font-bold">Get Started</h2>
          <p className="mt-2 text-blue-100">
            Follow these steps to create your developer portfolio
          </p>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
              <div className="bg-blue-100 text-blue-700 p-3 rounded-full">
                <User size={24} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  1. Create Your Profile
                </h3>
                <p className="text-gray-600 mb-3">
                  Add your personal information, skills, and contact details
                </p>
                <Button 
                  onClick={() => navigate('/profile')}
                  variant={hasProfile ? 'outline' : 'primary'}
                  className="flex items-center"
                >
                  {hasProfile ? 'Edit Profile' : 'Create Profile'}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
              <div className="bg-blue-100 text-blue-700 p-3 rounded-full">
                <Briefcase size={24} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  2. Add Your Projects
                </h3>
                <p className="text-gray-600 mb-3">
                  Showcase your work with detailed project information
                </p>
                <Button 
                  onClick={() => navigate('/projects')}
                  variant={hasProjects ? 'outline' : 'primary'}
                  disabled={!hasProfile}
                  className="flex items-center"
                >
                  {hasProjects ? 'Manage Projects' : 'Add Projects'}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
              <div className="bg-blue-100 text-blue-700 p-3 rounded-full">
                <Eye size={24} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  3. Preview Your Portfolio
                </h3>
                <p className="text-gray-600 mb-3">
                  See how your portfolio looks and make any final adjustments
                </p>
                <Button 
                  onClick={() => navigate('/preview')}
                  variant="outline"
                  disabled={!hasProfile || !hasProjects}
                  className="flex items-center"
                >
                  Preview Portfolio
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button 
          variant="primary"
          onClick={handleSaveAndExit}
        >
          Save & Exit
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
