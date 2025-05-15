import React, { useState } from 'react'
import { X, Users, Sparkles, Zap, Play } from 'lucide-react'

export const HeroSection: React.FC = () => {
  const [showHero, setShowHero] = useState(true)

  if (!showHero) return null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
      <div className="relative bg-gradient-to-r from-blue-400 to-purple-600 text-white py-12 px-6 sm:px-8 lg:px-12 mb-8 rounded-lg shadow-lg animate-fade-in">
        <button 
          className="absolute top-3 right-3 text-white/80 hover:text-white focus:outline-none transition-colors duration-200" 
          aria-label="Close hero section"
          onClick={() => setShowHero(false)}
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:flex-1 mb-8 md:mb-0">
            <h1 className="text-3xl font-bold mb-4 leading-tight">
              Discover & Connect in the ChatAndBuild Community Space
            </h1>
            <p className="text-white/90 mb-6 text-lg">
              Explore innovative projects, connect with fellow builders, and showcase your own creations in our collaborative community.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <Users className="h-5 w-5 mr-3 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/80">
                  Connect with a diverse community of creators and AI enthusiasts
                </p>
              </div>
              
              <div className="flex items-start">
                <Sparkles className="h-5 w-5 mr-3 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/80">
                  Get inspired by trending projects and innovative solutions
                </p>
              </div>
              
              <div className="flex items-start">
                <Zap className="h-5 w-5 mr-3 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/80">
                  Share feedback and collaborate on projects in real-time
                </p>
              </div>
            </div>
            
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-md text-purple-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-600 focus:ring-white transition-all duration-200 hover:shadow-lg">
              <Play className="mr-2 h-4 w-4" />
              Take A Tour
            </button>
          </div>
          
          <div className="md:flex-1 w-full">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 w-full h-full flex items-center justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center animate-pulse-slow hover:animate-none transition-all duration-300 cursor-pointer group">
                    <Play className="h-16 w-16 text-white group-hover:text-yellow-400 transition-colors duration-300" />
                  </div>
                  <span className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-sm font-medium text-white">
                    Community Showcase
                  </span>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-blue-500 text-white px-3 py-1.5 rounded-full shadow-lg text-sm font-medium animate-bounce-slow">
              New Features!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
