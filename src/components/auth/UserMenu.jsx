
import React from 'react';
import { Heart, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();

  return (
    <>
      <Link to="/favorites" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
        <Heart className="h-4 w-4" />
        <span className="hidden sm:inline">Избранное</span>
        {favorites.length > 0 && (
          <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {favorites.length}
          </span>
        )}
      </Link>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="h-8 w-8 rounded-full"
          />
          <span className="hidden sm:inline text-sm font-medium">{user.name}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={logout}
          className="text-red-600 hover:text-red-700"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export default UserMenu;
