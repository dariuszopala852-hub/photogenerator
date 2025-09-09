/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { UploadIcon, MagicWandIcon, PaletteIcon, SunIcon, SparkleIcon } from './icons';

interface StartScreenProps {
  onFileSelect: (files: FileList | null) => void;
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const StartScreen: React.FC<StartScreenProps> = ({ onFileSelect, onGenerate, isLoading }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelect(e.target.files);
  };

  const handleGenerateClick = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(prompt);
  };

  return (
    <div 
      className={`w-full max-w-5xl mx-auto text-center p-8 transition-all duration-300 rounded-2xl border-2 ${isDraggingOver ? 'bg-blue-500/10 border-dashed border-blue-400' : 'border-transparent'}`}
      onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
      onDragLeave={() => setIsDraggingOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDraggingOver(false);
        onFileSelect(e.dataTransfer.files);
      }}
    >
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-100 sm:text-6xl md:text-7xl">
          AI Photo Creation & <span className="text-blue-400">Editing</span>.
        </h1>
        <p className="max-w-3xl text-lg text-gray-400 md:text-xl">
          Start by generating a new image from your imagination, or upload a photo to retouch, apply filters, and make professional adjustments.
        </p>

        <div className="mt-8 w-full max-w-3xl">
          <form onSubmit={handleGenerateClick} className="flex flex-col gap-4">
              <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe an image to create... e.g., 'A quick selfie of a businesswoman in an elevator, elegant suit, checking her reflection.'"
                  className="w-full bg-gray-800/80 border border-gray-700/80 text-gray-200 rounded-lg p-5 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none backdrop-blur-sm disabled:opacity-60"
                  rows={3}
                  disabled={isLoading}
              />
              <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full group hover:from-blue-500 hover:to-cyan-400 transition-all duration-300 ease-in-out shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/40 disabled:from-gray-600 disabled:to-gray-500 disabled:shadow-none disabled:cursor-not-allowed"
                  disabled={isLoading || !prompt.trim()}
              >
                  <SparkleIcon className="w-6 h-6 mr-3" />
                  Generate Image
              </button>
          </form>
        </div>
        
        <div className="relative flex items-center justify-center w-full max-w-lg my-6">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="flex-shrink mx-4 text-gray-500 font-semibold">OR</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <div className="flex flex-col items-center gap-4">
            <label htmlFor="image-upload-start" className="relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-gray-300 bg-gray-800/80 border border-gray-700/80 rounded-full cursor-pointer group hover:bg-white/10 hover:text-white transition-colors backdrop-blur-sm">
                <UploadIcon className="w-6 h-6 mr-3" />
                Upload an Image to Edit
            </label>
            <input id="image-upload-start" type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isLoading} />
            <p className="text-sm text-gray-500">drag and drop a file</p>
        </div>
        
        <div className="mt-16 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-black/20 p-6 rounded-lg border border-gray-700/50 flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full mb-4">
                       <SparkleIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-100">Generate from Text</h3>
                    <p className="mt-2 text-gray-400">Bring your creative visions to life. Describe anything you can imagine, and watch our AI generate a unique image for you to edit.</p>
                </div>
                <div className="bg-black/20 p-6 rounded-lg border border-gray-700/50 flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full mb-4">
                       <MagicWandIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-100">Precise Retouching</h3>
                    <p className="mt-2 text-gray-400">Click any point on your image to remove blemishes, change colors, or add elements with pinpoint accuracy.</p>
                </div>
                <div className="bg-black/20 p-6 rounded-lg border border-gray-700/50 flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full mb-4">
                       <PaletteIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-100">Creative Filters</h3>
                    <p className="mt-2 text-gray-400">Transform photos with artistic styles. From vintage looks to futuristic glows, find or create the perfect filter.</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default StartScreen;