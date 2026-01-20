import React from 'react';

function Loading() {
  return (
    <div className="flex items-center justify-center h-[40vh] bg-transparent">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-24 h-24 border-4 border-gray-400 border-t-black rounded-full animate-spin"></div>
        
        {/* Loading text */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-8">
          <p className="text-slate-700 text-lg font-medium tracking-wide">
            Loading
            <span className="animate-pulse">.</span>
            <span className="animate-pulse delay-150">.</span>
            <span className="animate-pulse delay-300">.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Loading;