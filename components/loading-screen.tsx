"use client";

import { useEffect, useState } from "react";

export function LoadingScreen({ totalImages, loadedImages }: { totalImages: number; loadedImages: number }) {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (totalImages > 0) {
      const progressPercentage = Math.round((loadedImages / totalImages) * 100);
      setProgress(progressPercentage);
    }
    
    if (loadedImages >= totalImages) {
      setIsLoading(false);
    }
  }, [loadedImages, totalImages]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="mb-4">
          <div className="w-64 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <p className="text-gray-600">
          Loading images... {progress}% complete
        </p>
      </div>
    </div>
  );
}
