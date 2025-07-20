import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  className, 
  variant = 'default',
  hover = true,
  children, 
  ...props 
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300',
        {
          'bg-white/70 backdrop-blur-sm shadow-lg shadow-slate-200/50': variant === 'default',
          'bg-white shadow-xl shadow-slate-200/60 border border-slate-200/60': variant === 'elevated',
          'bg-white border-2 border-slate-200 shadow-sm': variant === 'outlined',
        },
        {
          'hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1': hover && variant === 'default',
          'hover:shadow-2xl hover:shadow-slate-200/70 hover:-translate-y-1': hover && variant === 'elevated',
          'hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50': hover && variant === 'outlined',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};