import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Template {
  id: string;
  name: string;
  description: string;
}

interface TemplateContextType {
  activeTemplate: string;
  setActiveTemplate: (id: string) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const templates: Template[] = [
  { id: 'template-0', name: 'Premium Classic', description: 'Template clássico e sofisticado com navegação em abas e design clean.' },
  { id: 'template-1', name: 'Original Template 1', description: 'O template original fornecido em src/templates/template-1' },
  { id: 'template-2', name: 'Original Template 2', description: 'O template original fornecido em src/templates/template-2' },
  { id: 'template-3', name: 'Original Template 3', description: 'O template original fornecido em src/templates/template-3' },
  { id: 'template-4', name: 'Original Template 4', description: 'O template original fornecido em src/templates/template-4' },
  { id: 'template-5', name: 'Original Template 5', description: 'O template original fornecido em src/templates/template-5' },
  { id: 'template-6', name: 'Original Template 6', description: 'O template original fornecido em src/templates/template-6' }
];

export const TemplateProvider = ({ children }: { children: ReactNode }) => {
  const [activeTemplate, setActiveTemplate] = useState('template-1');

  return (
    <TemplateContext.Provider value={{ activeTemplate, setActiveTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};
