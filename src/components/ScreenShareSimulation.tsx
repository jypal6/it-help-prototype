import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Monitor, Camera, Settings, Play, ChevronRight, X, Minimize2, Maximize2 } from 'lucide-react';

interface ScreenShareSimulationProps {
  onBack: () => void;
}

const troubleshootingSteps = [
  {
    id: 1,
    title: "Check Camera Permissions",
    description: "Let's verify that Teams has permission to access your camera.",
    instruction: "Click on the Windows Start menu and search for 'Camera privacy settings'",
    completed: false,
    screenType: 'privacy-settings'
  },
  {
    id: 2,
    title: "Open Privacy Settings",
    description: "Navigate to camera privacy settings in Windows.",
    instruction: "Click on 'Camera privacy settings' from the search results",
    completed: false,
    screenType: 'camera-privacy'
  },
  {
    id: 3,
    title: "Enable Camera Access",
    description: "Allow apps to access your camera.",
    instruction: "Toggle 'Allow apps to access your camera' to ON",
    completed: false,
    screenType: 'camera-permissions'
  },
  {
    id: 4,
    title: "Allow Microsoft Teams",
    description: "Specifically enable camera access for Teams.",
    instruction: "Scroll down and toggle Microsoft Teams to ON",
    completed: false,
    screenType: 'teams-permission'
  },
  {
    id: 5,
    title: "Test Camera in Teams",
    description: "Verify the camera is now working in Teams.",
    instruction: "Open Teams and start a test call to check your camera",
    completed: false,
    screenType: 'teams-test'
  }
];

const ScreenShareSimulation: React.FC<ScreenShareSimulationProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState(troubleshootingSteps);
  const [isGuiding, setIsGuiding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('teams-error');

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      const updatedSteps = [...steps];
      if (currentStep > 0) {
        updatedSteps[currentStep - 1].completed = true;
      }
      setSteps(updatedSteps);
      setCurrentStep(currentStep + 1);
      
      // Update screen based on current step
      if (currentStep < steps.length) {
        setCurrentScreen(steps[currentStep].screenType);
      }
      
      if (currentStep === steps.length - 1) {
        updatedSteps[currentStep].completed = true;
        setSteps(updatedSteps);
        setTimeout(() => {
          setShowSuccess(true);
          setCurrentScreen('teams-success');
        }, 1000);
      }
    }
  };

  const startTroubleshooting = () => {
    setIsGuiding(true);
    setCurrentStep(1);
    setCurrentScreen('start-menu');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'teams-error':
        return (
          <div className="flex items-center justify-center h-full bg-gray-900 relative">
            <div className="bg-gray-800 p-8 rounded-lg max-w-md text-center">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-white text-xl font-semibold mb-2">We can't find your camera</h2>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Check to make sure it's connected and installed properly, and that it isn't being 
                blocked by antivirus software, and that your camera drivers are up to date.
              </p>
              <p className="text-gray-400 text-xs mb-4">
                Error code: 0xA00F4244&lt;NoCamerasAreAttached&gt;
              </p>
              <div className="flex space-x-3 justify-center">
                <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                  Learn more
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors">
                  Get help
                </button>
              </div>
            </div>
          </div>
        );

      case 'start-menu':
        return (
          <div className="h-full bg-gradient-to-br from-blue-600 to-purple-700 relative">
            {/* Start Menu */}
            <div className="absolute bottom-16 left-4 w-80 bg-gray-800 bg-opacity-95 rounded-lg shadow-2xl">
              <div className="p-4">
                <div className="relative mb-4">
                  <input
                    type="text"
                    value="Camera privacy settings"
                    readOnly
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded border-2 border-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-2 bg-blue-600 rounded hover:bg-blue-700 cursor-pointer">
                    <Settings className="w-5 h-5 text-white" />
                    <div>
                      <div className="text-white font-medium text-sm">Camera privacy settings</div>
                      <div className="text-blue-200 text-xs">System settings</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer">
                    <Camera className="w-5 h-5 text-gray-300" />
                    <div>
                      <div className="text-gray-300 text-sm">Camera</div>
                      <div className="text-gray-400 text-xs">App</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Taskbar */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-800 bg-opacity-90 flex items-center px-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'privacy-settings':
        return (
          <div className="h-full bg-white">
            {/* Settings Window */}
            <div className="h-full flex flex-col">
              {/* Title Bar */}
              <div className="bg-white border-b flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Settings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-red-500 hover:text-white rounded">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-1">
                {/* Left Sidebar */}
                <div className="w-64 bg-gray-50 border-r p-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-900 mb-2">Privacy & security</div>
                    <div className="flex items-center space-x-2 p-2 bg-blue-100 text-blue-700 rounded cursor-pointer">
                      <Camera className="w-4 h-4" />
                      <span className="text-sm">Camera</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                      <span className="text-sm text-gray-700">Microphone</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                      <span className="text-sm text-gray-700">Location</span>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                  <h1 className="text-2xl font-semibold mb-6">Camera</h1>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Camera access for this device</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Camera access for this device is on. You can turn it off, but some apps and services may not work as expected.
                      </p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Change
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'camera-privacy':
        return (
          <div className="h-full bg-white">
            <div className="h-full flex flex-col">
              {/* Title Bar */}
              <div className="bg-white border-b flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Settings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-red-500 hover:text-white rounded">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-1">
                {/* Left Sidebar */}
                <div className="w-64 bg-gray-50 border-r p-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-900 mb-2">Privacy & security</div>
                    <div className="flex items-center space-x-2 p-2 bg-blue-100 text-blue-700 rounded cursor-pointer">
                      <Camera className="w-4 h-4" />
                      <span className="text-sm">Camera</span>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                  <h1 className="text-2xl font-semibold mb-6">Camera</h1>
                  <div className="space-y-6">
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Allow apps to access your camera</h3>
                          <p className="text-sm text-gray-600 mt-1">Currently OFF - Click to enable</p>
                        </div>
                        <div className="relative">
                          <button className="w-12 h-6 bg-gray-300 rounded-full border-2 border-gray-400 transition-colors hover:bg-gray-400">
                            <div className="w-4 h-4 bg-white rounded-full shadow transform translate-x-0 transition-transform"></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'camera-permissions':
        return (
          <div className="h-full bg-white">
            <div className="h-full flex flex-col">
              {/* Title Bar */}
              <div className="bg-white border-b flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Settings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-red-500 hover:text-white rounded">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-1">
                {/* Left Sidebar */}
                <div className="w-64 bg-gray-50 border-r p-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-900 mb-2">Privacy & security</div>
                    <div className="flex items-center space-x-2 p-2 bg-blue-100 text-blue-700 rounded cursor-pointer">
                      <Camera className="w-4 h-4" />
                      <span className="text-sm">Camera</span>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                  <h1 className="text-2xl font-semibold mb-6">Camera</h1>
                  <div className="space-y-6">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Allow apps to access your camera</h3>
                          <p className="text-sm text-green-600 mt-1">Enabled ✓</p>
                        </div>
                        <div className="relative">
                          <button className="w-12 h-6 bg-blue-600 rounded-full border-2 border-blue-600 transition-colors">
                            <div className="w-4 h-4 bg-white rounded-full shadow transform translate-x-6 transition-transform"></div>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Choose which Microsoft Store apps can access your camera</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">T</span>
                            </div>
                            <span className="font-medium">Microsoft Teams</span>
                          </div>
                          <div className="relative">
                            <button className="w-12 h-6 bg-gray-300 rounded-full border-2 border-gray-400 transition-colors hover:bg-gray-400">
                              <div className="w-4 h-4 bg-white rounded-full shadow transform translate-x-0 transition-transform"></div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'teams-permission':
        return (
          <div className="h-full bg-white">
            <div className="h-full flex flex-col">
              {/* Title Bar */}
              <div className="bg-white border-b flex items-center justify-between px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Settings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-red-500 hover:text-white rounded">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-1">
                {/* Left Sidebar */}
                <div className="w-64 bg-gray-50 border-r p-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-900 mb-2">Privacy & security</div>
                    <div className="flex items-center space-x-2 p-2 bg-blue-100 text-blue-700 rounded cursor-pointer">
                      <Camera className="w-4 h-4" />
                      <span className="text-sm">Camera</span>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                  <h1 className="text-2xl font-semibold mb-6">Camera</h1>
                  <div className="space-y-6">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">Allow apps to access your camera</h3>
                          <p className="text-sm text-green-600 mt-1">Enabled ✓</p>
                        </div>
                        <div className="relative">
                          <button className="w-12 h-6 bg-blue-600 rounded-full border-2 border-blue-600 transition-colors">
                            <div className="w-4 h-4 bg-white rounded-full shadow transform translate-x-6 transition-transform"></div>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Choose which Microsoft Store apps can access your camera</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border-2 border-green-500 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">T</span>
                            </div>
                            <div>
                              <span className="font-medium">Microsoft Teams</span>
                              <p className="text-sm text-green-600">Camera access enabled ✓</p>
                            </div>
                          </div>
                          <div className="relative">
                            <button className="w-12 h-6 bg-blue-600 rounded-full border-2 border-blue-600 transition-colors">
                              <div className="w-4 h-4 bg-white rounded-full shadow transform translate-x-6 transition-transform"></div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'teams-test':
        return (
          <div className="h-full bg-gray-900 relative">
            {/* Teams Interface */}
            <div className="absolute inset-4 bg-white rounded-lg shadow-2xl overflow-hidden">
              {/* Teams Header */}
              <div className="bg-gray-100 px-4 py-2 border-b flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="ml-4 text-sm font-medium text-gray-700">Microsoft Teams - Test Call</span>
                </div>
              </div>

              {/* Video Preview */}
              <div className="flex items-center justify-center h-full bg-gray-100 relative">
                <div className="w-96 h-72 bg-blue-600 rounded-lg relative overflow-hidden">
                  {/* Simulated video feed */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-800"></div>
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                    You
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  {/* Simulated person silhouette */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <div className="w-16 h-16 bg-white bg-opacity-30 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Success message */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Camera is working!</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                <button className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700">
                  <X className="w-6 h-6" />
                </button>
                <button className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-700">
                  <Camera className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        );

      case 'teams-success':
        return (
          <div className="h-full bg-gray-900 relative">
            <div className="absolute inset-4 bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 border-b flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="ml-4 text-sm font-medium text-gray-700">Microsoft Teams</span>
                </div>
              </div>

              <div className="flex items-center justify-center h-full bg-green-50">
                <div className="text-center">
                  <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-800 mb-4">Camera Fixed Successfully!</h2>
                  <p className="text-green-700 mb-6">Your camera is now working properly in Microsoft Teams.</p>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Start a Meeting
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-gray-900 pt-10 pb-6">
      {/* Left Sidebar - Agent Control Panel */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">Screen Sharing Active</span>
            </div>
          </div>
        </div>

        {/* Agent Chat/Instructions */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Camera Troubleshooting</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    I can see your screen showing the camera error. Let me guide you through fixing this step by step.
                  </p>
                  {!isGuiding ? (
                    <button
                      onClick={startTroubleshooting}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Play className="w-4 h-4" />
                      <span>Start Troubleshooting</span>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Troubleshooting Steps */}
            {isGuiding && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 mb-3">Troubleshooting Steps</h4>
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      index + 1 === currentStep
                        ? 'border-blue-500 bg-blue-50'
                        : step.completed
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                        step.completed
                          ? 'bg-green-500 text-white'
                          : index + 1 === currentStep
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {step.completed ? <Check className="w-4 h-4" /> : step.id}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 text-sm">{step.title}</h5>
                        <p className="text-xs text-gray-600 mt-1">{step.description}</p>
                        {index + 1 === currentStep && (
                          <div className="mt-2">
                            <p className="text-xs text-blue-700 font-medium mb-2">
                              Current instruction:
                            </p>
                            <p className="text-xs text-gray-700 bg-white p-2 rounded border">
                              {step.instruction}
                            </p>
                            <button
                              onClick={handleNextStep}
                              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
                            >
                              {index === steps.length - 1 ? 'Complete' : 'Next Step'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Success Message */}
            {showSuccess && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">Issue Resolved!</h3>
                    <p className="text-sm text-green-700 mb-3">
                      Excellent! Your camera is now working properly in Microsoft Teams. The issue has been completely resolved.
                    </p>
                    <p className="text-xs text-green-600">
                      You can now join video calls and meetings without any camera issues.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Simulated Desktop Screen */}
      <div className="flex-1 p-4">
        <div className="h-full bg-gradient-to-br from-blue-800 to-purple-900 rounded-lg relative overflow-hidden">
          {/* Simulated Windows Desktop Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.pexels.com/photos/956999/milky-way-starry-sky-night-sky-star-956999.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>

          {/* Dynamic Screen Content */}
          <div className="absolute top-8 left-8 right-8 bottom-16">
            <div className="bg-white rounded-lg shadow-2xl h-full overflow-hidden">
              {renderCurrentScreen()}
            </div>
          </div>

          {/* Taskbar */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-800 bg-opacity-90 flex items-center px-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenShareSimulation;