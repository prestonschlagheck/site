import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 bg-[#131313] border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs">
            © {currentYear} Preston Schlagheck
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 