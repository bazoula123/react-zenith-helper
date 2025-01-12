import React from 'react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-primary to-secondary animate-gradient-shift bg-[length:200%_200%]">
      <div className="container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Welcome to Your Next Project
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Build something amazing with modern web technologies and beautiful design
        </p>
        <div className="flex gap-4 justify-center">
          <Button className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6">
            Get Started
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;