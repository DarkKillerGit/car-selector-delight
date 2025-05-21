
import React from 'react';
import { Car } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-primary">CarFinder</h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Browse Cars
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Sell Your Car
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            About Us
          </a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium h-9 bg-primary text-white px-4 py-2 shadow hover:bg-primary/90 transition-colors">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
