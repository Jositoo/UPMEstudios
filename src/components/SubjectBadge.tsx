import React from 'react';

interface SubjectBadgeProps {
  name: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function SubjectBadge({ name, color = '#3B82F6', size = 'medium' }: SubjectBadgeProps) {
  const sizeStyles = {
    small: { padding: '2px 8px', fontSize: '11px', borderRadius: '4px' },
    medium: { padding: '4px 12px', fontSize: '13px', borderRadius: '6px' },
    large: { padding: '6px 16px', fontSize: '15px', borderRadius: '8px' }
  };

  return (
    <span 
      style={{
        ...sizeStyles[size],
        backgroundColor: `${color}20`, // 20% opacity background
        color: color,
        border: `1px solid ${color}40`,
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        whiteSpace: 'nowrap'
      }}
    >
      <span 
        style={{ 
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          backgroundColor: color, 
          marginRight: '6px',
          boxShadow: `0 0 6px ${color}`
        }} 
      />
      {name}
    </span>
  );
}
