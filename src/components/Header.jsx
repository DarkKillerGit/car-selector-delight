
import React, { useState } from 'react';
import { Car, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import AuthDialog from './auth/AuthDialog';
import UserMenu from './auth/UserMenu';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-primary">CarFinder</h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
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
            <ThemeToggle />
            {user ? (
              <UserMenu />
            ) : (
              <Button 
                onClick={() => setIsAuthDialogOpen(true)}
                className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium h-9 bg-primary text-white px-4 py-2 shadow hover:bg-primary/90 transition-colors"
              >
                <User className="h-4 w-4 mr-2" />
                Войти
              </Button>
            )}
          </div>
        </div>
      </header>
      
      <AuthDialog 
        isOpen={isAuthDialogOpen} 
        onClose={() => setIsAuthDialogOpen(false)} 
      />
    </>
  );
};

export default Header;
