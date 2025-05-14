'use client';

import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll event to change navigation appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#0a0a0a]/80 py-3 backdrop-blur-md' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-white hover:opacity-80 transition-opacity font-medium tracking-wide"
          >
            PS
          </a>
          
          <div className="flex space-x-8">
            <button 
              onClick={() => scrollToSection('experience')}
              className="text-gray-400 hover:text-white transition-colors text-xs font-medium"
            >
              Experience
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-400 hover:text-white transition-colors text-xs font-medium"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 