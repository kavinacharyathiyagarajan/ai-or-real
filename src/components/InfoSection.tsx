import React from 'react';

interface InfoSectionProps {
  onBackToHome: () => void;
}

const InfoSection: React.FC<InfoSectionProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={onBackToHome}
            className="text-indigo-600 hover:text-indigo-700 font-medium mb-6 inline-flex items-center gap-2"
          >
            ← Back to Home
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why It's Getting Harder to Tell
          </h1>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            AI image generation has evolved rapidly, with models like Midjourney, DALL·E, and Stable Diffusion 
            creating hyperrealistic images that can fool even trained experts. Understanding these advances 
            is crucial in our increasingly digital world.
          </p>
        </div>

        {/* AI Models Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Leading AI Image Generation Models
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">MJ</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Midjourney</h3>
              <p className="text-gray-600 text-sm">Known for artistic, high-quality images with exceptional detail and creative interpretation.</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">DE</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">DALL·E 3</h3>
              <p className="text-gray-600 text-sm">OpenAI's model excels at understanding complex prompts and generating realistic imagery.</p>
            </div>
            
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">SD</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Stable Diffusion</h3>
              <p className="text-gray-600 text-sm">Open-source model that democratized AI image generation with impressive results.</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">58%</div>
            <div className="text-gray-700 font-medium mb-1">Detection Rate</div>
            <div className="text-sm text-gray-500">Average human accuracy at identifying AI images</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">2024</div>
            <div className="text-gray-700 font-medium mb-1">Breakthrough Year</div>
            <div className="text-sm text-gray-500">When AI images became nearly indistinguishable</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
            <div className="text-gray-700 font-medium mb-1">AI Tool Accuracy</div>
            <div className="text-sm text-gray-500">Success rate of specialized detection tools</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">1000x</div>
            <div className="text-gray-700 font-medium mb-1">Speed Increase</div>
            <div className="text-sm text-gray-500">Image generation speed improvement since 2020</div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Evolution of AI Image Generation
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-red-600">2020</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Early GANs</h3>
                <p className="text-gray-600">Images were clearly artificial, with obvious artifacts and low resolution.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-yellow-600">2022</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Diffusion Models</h3>
                <p className="text-gray-600">DALL·E 2 and Stable Diffusion launched, creating more realistic images.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-green-600">2024</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Photorealistic Era</h3>
                <p className="text-gray-600">Current models produce images indistinguishable from photographs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detection Methods */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How Detection Tools Work
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-indigo-600">Technical Analysis</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  Pixel-level artifacts and noise patterns
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  Compression and encoding signatures
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  Mathematical inconsistencies in image data
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  Frequency domain analysis
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-3 text-green-600">Visual Clues</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  Inconsistent lighting and shadows
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  Unnatural facial features or proportions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  Text and fine detail artifacts
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  Background inconsistencies
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
