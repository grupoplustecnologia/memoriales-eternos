'use client';

import { ReactNode } from 'react';

export function Tabs({ 
  value, 
  onValueChange, 
  children,
  className 
}: { 
  value: string;
  onValueChange: (v: string) => void;
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`flex gap-2 mb-4 flex-wrap ${className || ''}`}>{children}</div>;
}

export function TabsTrigger({ 
  value, 
  children, 
  onClick 
}: { 
  value: string; 
  children: ReactNode; 
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg border border-nature-300 bg-white hover:bg-nature-50 font-medium text-sm transition-colors"
    >
      {children}
    </button>
  );
}

export function TabsContent({ 
  value, 
  children, 
  show,
  className 
}: { 
  value: string; 
  children: ReactNode;
  show?: boolean;
  className?: string;
}) {
  return show ? <div className={className}>{children}</div> : null;
}
