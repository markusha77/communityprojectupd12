import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, MessageSquare, Share2, ExternalLink, Github } from 'lucide-react'

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()

  // This would normally come from an API or context
  // For now, we'll use mock data based on the projectId
  const projects = [
    {
      id: '1',
      title: 'AI-Powered Task Manager',
      description: 'A task management app that uses AI to prioritize and suggest tasks based on your work patterns and deadlines.',
      longDescription: 'This AI-powered task manager analyzes your work habits, calendar, and task completion patterns to intelligently prioritize your to-do list. It integrates with popular calendar apps and project management tools to provide a unified view of your responsibilities. The AI suggests optimal times for deep work, automatically reschedules less urgent tasks when you\'re overloaded, and provides insights into your productivity patterns.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Full-stack developer with a passion for AI and productivity tools. Working at the intersection of machine learning and user experience.'
      },
      likes: 124,
      comments: 18,
      tags: ['AI', 'Productivity', 'React'],
      demoUrl: 'https://example.com/demo',
      githubUrl: 'https://github.com/example/ai-task-manager',
      techStack: ['React', 'Node.js', 'TensorFlow.js', 'MongoDB'],
      screenshots: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '2',
      title: 'Virtual Reality Meditation Space',
      description: 'A VR application that creates immersive meditation environments with guided sessions and biofeedback integration.',
      longDescription: 'This VR meditation application transports users to serene natural environments designed specifically for mindfulness practice. It features guided meditation sessions led by experienced instructors, ambient soundscapes recorded in 3D audio, and optional biofeedback integration via compatible wearables. The app adapts the environment based on the user\'s stress levels and meditation goals, creating a truly personalized experience.',
      image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Maya Patel',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'XR developer and meditation practitioner. Creating technology that enhances mental wellbeing and mindfulness.'
      },
      likes: 89,
      comments: 7,
      tags: ['VR', 'Wellness', 'Unity'],
      demoUrl: 'https://example.com/vr-demo',
      githubUrl: 'https://github.com/example/vr-meditation',
      techStack: ['Unity', 'C#', 'Oculus SDK', 'Bluetooth LE'],
      screenshots: [
        'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '3',
      title: 'Sustainable Food Delivery Platform',
      description: 'An eco-friendly food delivery service that connects users with local restaurants using zero-waste packaging.',
      longDescription: 'This platform revolutionizes food delivery by prioritizing sustainability at every step. It partners exclusively with restaurants committed to eco-friendly practices and uses a fleet of electric bikes and vehicles for delivery. All meals are packaged in compostable or reusable containers, and customers can opt into a container return program for additional discounts. The app also calculates and displays the carbon footprint saved with each order compared to traditional delivery services.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Carlos Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Environmental engineer turned developer. Building tech solutions for a more sustainable future.'
      },
      likes: 56,
      comments: 12,
      tags: ['Sustainability', 'Food', 'Mobile App'],
      demoUrl: 'https://example.com/eco-food-demo',
      githubUrl: 'https://github.com/example/eco-food-delivery',
      techStack: ['React Native', 'Firebase', 'Google Maps API', 'Stripe'],
      screenshots: [
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '4',
      title: 'Collaborative Music Creation Tool',
      description: 'A web platform that allows musicians to collaborate remotely on tracks with real-time editing and mixing capabilities.',
      longDescription: 'This collaborative platform enables musicians around the world to create together in real-time. It features a multi-track audio editor with version control, real-time collaboration tools, and integrated video chat. Musicians can record directly in the browser, import existing tracks, and apply professional-grade effects. The platform handles latency intelligently to ensure a smooth jamming experience even across continents. Finished projects can be exported in various formats or published directly to streaming platforms.',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Jamie Lee',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'Audio engineer and web developer. Creating tools that make music production more accessible and collaborative.'
      },
      likes: 210,
      comments: 34,
      tags: ['Music', 'Collaboration', 'Web Audio'],
      demoUrl: 'https://example.com/music-collab-demo',
      githubUrl: 'https://github.com/example/music-collab',
      techStack: ['WebRTC', 'Web Audio API', 'React', 'WebSockets', 'AWS'],
      screenshots: [
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '5',
      title: 'Smart Home Energy Monitor',
      description: 'An IoT device and companion app that tracks and optimizes home energy usage with AI-powered recommendations.',
      longDescription: 'This comprehensive energy monitoring system combines hardware sensors with intelligent software to give homeowners unprecedented insight into their energy consumption. The system identifies energy-hungry appliances, detects inefficient usage patterns, and provides actionable recommendations for reducing consumption. The AI learns from your habits and automatically adjusts connected smart home devices to optimize energy usage without sacrificing comfort. Users typically see 15-30% reduction in energy bills within the first three months.',
      image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'Sarah Kim',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'IoT specialist and clean energy advocate. Building smart solutions for more efficient and sustainable homes.'
      },
      likes: 76,
      comments: 9,
      tags: ['IoT', 'Energy', 'Sustainability'],
      demoUrl: 'https://example.com/energy-monitor-demo',
      githubUrl: 'https://github.com/example/smart-energy',
      techStack: ['ESP32', 'MQTT', 'TensorFlow Lite', 'React Native', 'AWS IoT'],
      screenshots: [
        'https://images.unsplash.com/photo-1558449028-b53a39d100fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1584267385494-9fdd9a71ad75?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: '6',
      title: 'Augmented Reality Language Learning',
      description: 'An AR app that helps users learn new languages by overlaying translations and pronunciation guides on real-world objects.',
      longDescription: 'This innovative language learning application uses augmented reality to make vocabulary acquisition intuitive and contextual. Users simply point their camera at objects around them, and the app identifies the items and displays their names in the target language, complete with pronunciation guides. The spaced repetition system tracks which words you\'ve learned and which need review, creating a personalized learning experience. The app supports 12 languages with plans to add more based on user demand.',
      image: 'https://images.unsplash.com/photo-1546777701-8ef25158125a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      author: {
        name: 'David Chen',
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        bio: 'AR/VR developer and language enthusiast. Creating immersive educational experiences through technology.'
      },
      likes: 143,
      comments: 21,
      tags: ['AR', 'Education', 'Mobile App'],
      demoUrl: 'https://example.com/ar-language-demo',
      githubUrl: 'https://github.com/example/ar-language',
      techStack: ['ARKit', 'ARCore', 'Unity', 'ML Kit', 'Firebase'],
      screenshots: [
        'https://images.unsplash.com/photo-1546777701-8ef25158125a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1622675363311-3e1904dc1885?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ]
    }
  ]

  const project = projects.find(p => p.id === projectId)

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h2>
          <button
            onClick={() => navigate('/community')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Community
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/community')}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Community
      </button>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="h-80 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center mb-4">
            <img 
              src={project.author.avatar} 
              alt={project.author.name}
              className="h-10 w-10 rounded-full mr-3"
            />
            <div>
              <h3 className="font-medium text-gray-900">{project.author.name}</h3>
              <p className="text-sm text-gray-500">{project.author.bio}</p>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>
          
          <p className="text-gray-700 mb-6">{project.longDescription}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="border-t border-b border-gray-200 py-4 my-6">
            <h3 className="font-semibold text-gray-900 mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {project.screenshots.map((screenshot, index) => (
              <div key={index} className="rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={screenshot} 
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-40 object-cover"
                />
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Demo
            </a>
            
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Github className="h-4 w-4 mr-2" />
              View Code
            </a>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div className="flex space-x-4">
              <button className="flex items-center text-gray-500 hover:text-indigo-600">
                <Heart className="h-5 w-5 mr-1" />
                <span>{project.likes}</span>
              </button>
              
              <button className="flex items-center text-gray-500 hover:text-indigo-600">
                <MessageSquare className="h-5 w-5 mr-1" />
                <span>{project.comments}</span>
              </button>
            </div>
            
            <button className="text-gray-500 hover:text-indigo-600">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
