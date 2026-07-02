import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  action?: React.ReactNode;
}

export default function Card({ children, title, className = '', action }: CardProps) {
  return (
    <div className={`glass-panel p-6 flex flex-col gap-4 ${className}`} style={{ padding: '24px' }}>
      {(title || action) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          {title && <h3 style={{ margin: 0 }}>{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
