import React, { useState } from 'react'
import { WelcomeStep } from './onboarding/WelcomeStep'
import { ProfileSetupStep } from './onboarding/ProfileSetupStep'
import { InterestsStep } from './onboarding/InterestsStep'
import { SpaceSelectionStep } from './onboarding/SpaceSelectionStep'
import { CompletionStep } from './onboarding/CompletionStep'
import { ProgressBar } from './ProgressBar'
import { AlertModal } from '../common/AlertModal'

interface OnboardingFlowProps {
  onComplete: () => void
  onCancel: () => void
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    bio: '',
    avatar: '',
    email: '',
    github: '',
    twitter: '',
    telegram: '',
    slack: '',
    discord: '',
    linkedin: '',
    website: '',
    interests: [] as string[],
    spaces: [] as string[]
  })
  
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  
  const steps = [
    'Welcome',
    'Profile',
    'Interests',
    'Spaces',
    'Complete'
  ]
  
  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }
  
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }
  
  const handleCancel = () => {
    if (currentStep === 0 || currentStep === steps.length - 1) {
      onCancel()
    } else {
      setShowCancelConfirm(true)
    }
  }
  
  const updateUserData = (data: Partial<typeof userData>) => {
    setUserData((prev) => ({ ...prev, ...data }))
  }
  
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <WelcomeStep 
            onNext={handleNext} 
            onCancel={handleCancel}
          />
        )
      case 1:
        return (
          <ProfileSetupStep 
            userData={userData}
            updateUserData={updateUserData}
            onNext={handleNext}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        )
      case 2:
        return (
          <InterestsStep 
            userData={userData}
            updateUserData={updateUserData}
            onNext={handleNext}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        )
      case 3:
        return (
          <SpaceSelectionStep 
            selectedSpaces={userData.spaces}
            updateSpaces={(spaces) => updateUserData({ spaces })}
            onNext={handleNext}
            onBack={handleBack}
            onCancel={handleCancel}
          />
        )
      case 4:
        return (
          <CompletionStep 
            userData={userData}
            isLastStep={true}
            onCancel={onComplete}
          />
        )
      default:
        return null
    }
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden">
        {/* Progress bar */}
        {currentStep < steps.length - 1 && (
          <div className="px-6 pt-6">
            <ProgressBar 
              steps={steps} 
              currentStep={currentStep} 
            />
          </div>
        )}
        
        {/* Content */}
        <div className="p-6">
          {renderStep()}
        </div>
        
        {/* Cancel confirmation dialog - replaced with AlertModal */}
        <AlertModal
          isOpen={showCancelConfirm}
          onClose={() => setShowCancelConfirm(false)}
          title="Cancel Onboarding?"
          message="Your progress will be lost. Are you sure you want to cancel?"
          type="warning"
          confirmLabel="Yes, Cancel"
          onConfirm={onCancel}
          cancelLabel="Continue Setup"
          showCancel={true}
        />
      </div>
    </div>
  )
}
