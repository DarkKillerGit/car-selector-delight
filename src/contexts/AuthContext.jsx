
import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (apiService.token) {
          const userData = await apiService.getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        apiService.logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signUp = async (email, password, firstName, lastName, age) => {
    try {
      const response = await apiService.register({
        email,
        password,
        name: firstName,
        surname: lastName,
        age: parseInt(age)
      });
      setUser(response.user);
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await apiService.login({ email, password });
      setUser(response.user);
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  };

  const signOut = async () => {
    apiService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session: user ? { user } : null,
      isAuthenticated: !!user,
      loading,
      signUp,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
