
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Scale, X } from 'lucide-react';
import { useCompare } from '../contexts/CompareContext';

const CompareButton = () => {
  const navigate = useNavigate();
  const { compareList, clearCompare } = useCompare();

  if (compareList.length < 2) {
    return null;
  }

  const handleCompare = () => {
    navigate('/compare');
  };

  const handleClear = () => {
    clearCompare();
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-primary" />
          <span className="font-medium text-foreground">
            Выбрано для сравнения: {compareList.length}
          </span>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClear}
            className="flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            Очистить
          </Button>
          <Button 
            onClick={handleCompare}
            className="flex items-center gap-2"
          >
            <Scale className="h-4 w-4" />
            Сравнить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompareButton;
