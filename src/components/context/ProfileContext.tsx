import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ProfileContextType {
  profile: {
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
    interests: string[]
    spaces: string[]
  }
  updateProfile: (data: Partial<ProfileContextType['profile']>) => void
}

const defaultProfile = {
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
  interests: [],
  spaces: []
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState(defaultProfile)

  const updateProfile = (data: Partial<typeof profile>) => {
    setProfile((prev) => ({ ...prev, ...data }))
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}
