import React from 'react';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-primary">Logo</div>
        <nav className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
          <a href="#about" className="text-gray-600 hover:text-primary transition-colors">About</a>
          <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
        </nav>
        <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
      </div>
    </header>
  );
};

export default Header;