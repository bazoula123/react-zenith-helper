import React, { useRef, useEffect, useState } from 'react';
import { preloadVideo } from '../../utils/imageOptimization';

interface VideoPreviewProps {
  videoUrl: string;
  onClick: () => void;
}

export function VideoPreview({ videoUrl, onClick }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.autoplay = true;
      video.playbackRate = 1.5;
      video.preload = "metadata"; // Only load metadata initially
      
      const loadVideo = async () => {
        try {
          // Use Intersection Observer to load video only when in viewport
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  preloadVideo(videoUrl).then(() => {
                    setIsLoaded(true);
                    video.play();
                  });
                  observer.unobserve(video);
                }
              });
            },
            { threshold: 0.1 }
          );

          observer.observe(video);

          return () => {
            observer.disconnect();
          };
        } catch (error) {
          console.error("Video loading/autoplay failed:", error);
        }
      };
      
      loadVideo();
    }
  }, [videoUrl]);

  return (
    <div 
      className="h-full relative cursor-pointer group"
      onClick={onClick}
    >
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <video 
        ref={videoRef}
        className={`w-full h-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        muted
        playsInline
        loop
        autoPlay
        preload="metadata"
        style={{ willChange: 'transform' }}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
          <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-[#67000D] border-b-[15px] border-b-transparent ml-2" />
        </div>
      </div>
    </div>
  );
}