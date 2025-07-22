import React from 'react';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Link({ to, children, className = '', onClick }: LinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Update the URL
    window.history.pushState({}, '', to);
    
    // Dispatch a custom event to notify the app of navigation
    window.dispatchEvent(new CustomEvent('navigation', { detail: { path: to } }));
    
    // Call the onClick handler if provided
    if (onClick) onClick();
  };

  return (
    <a 
      href={to} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}