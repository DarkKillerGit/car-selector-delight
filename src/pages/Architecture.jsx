
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

const Architecture = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-4">
        <div className="mb-4">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад на главную
          </Button>
        </div>
        <ArchitectureDiagram />
      </div>
    </div>
  );
};

export default Architecture;
