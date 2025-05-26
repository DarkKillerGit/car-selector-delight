
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ArchitectureDiagram = () => {
  const modules = [
    {
      name: 'App.jsx',
      type: 'Главный модуль',
      children: ['Router', 'Providers', 'Routes'],
      position: { x: 50, y: 10 }
    },
    {
      name: 'Pages',
      type: 'Модуль страниц',
      children: ['Index.jsx', 'CarDetails.jsx', 'Favorites.jsx', 'Compare.jsx', 'NotFound.jsx'],
      position: { x: 20, y: 30 }
    },
    {
      name: 'Components',
      type: 'Модуль компонентов',
      children: ['Header.jsx', 'Hero.jsx', 'CarCard.jsx', 'CarGrid.jsx', 'FilterPanel.jsx', 'SearchBar.jsx', 'CompareButton.jsx'],
      position: { x: 50, y: 30 }
    },
    {
      name: 'Contexts',
      type: 'Модуль контекстов',
      children: ['AuthContext.jsx', 'FavoritesContext.jsx', 'CompareContext.jsx', 'ThemeContext.jsx'],
      position: { x: 80, y: 30 }
    },
    {
      name: 'Utils',
      type: 'Утилиты',
      children: ['searchUtils.js'],
      position: { x: 20, y: 60 }
    },
    {
      name: 'Data',
      type: 'Данные',
      children: ['cars.js'],
      position: { x: 50, y: 60 }
    },
    {
      name: 'UI Components',
      type: 'UI библиотека',
      children: ['button.tsx', 'card.tsx', 'checkbox.tsx', 'table.tsx', 'switch.tsx', 'и др.'],
      position: { x: 80, y: 60 }
    }
  ];

  const connections = [
    { from: 'App.jsx', to: 'Pages' },
    { from: 'App.jsx', to: 'Contexts' },
    { from: 'Pages', to: 'Components' },
    { from: 'Components', to: 'Contexts' },
    { from: 'Components', to: 'Utils' },
    { from: 'Components', to: 'Data' },
    { from: 'Components', to: 'UI Components' }
  ];

  return (
    <div className="w-full h-screen bg-background p-8">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Архитектура приложения CarFinder</CardTitle>
        </CardHeader>
        <CardContent className="h-full">
          <div className="relative w-full h-full">
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              {connections.map((conn, index) => {
                const fromModule = modules.find(m => m.name === conn.from);
                const toModule = modules.find(m => m.name === conn.to);
                if (!fromModule || !toModule) return null;
                
                return (
                  <line
                    key={index}
                    x1={`${fromModule.position.x}%`}
                    y1={`${fromModule.position.y + 10}%`}
                    x2={`${toModule.position.x}%`}
                    y2={`${toModule.position.y}%`}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted-foreground"
                    markerEnd="url(#arrowhead)"
                  />
                );
              })}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="currentColor"
                    className="text-muted-foreground"
                  />
                </marker>
              </defs>
            </svg>

            {modules.map((module, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${module.position.x}%`,
                  top: `${module.position.y}%`,
                  zIndex: 2
                }}
              >
                <Card className="min-w-48 bg-card border-2 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-bold text-center text-primary">
                      {module.name}
                    </CardTitle>
                    <p className="text-xs text-center text-muted-foreground">
                      {module.type}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1">
                      {module.children.map((child, childIndex) => (
                        <div
                          key={childIndex}
                          className="text-xs p-1 bg-muted rounded text-center"
                        >
                          {child}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArchitectureDiagram;
