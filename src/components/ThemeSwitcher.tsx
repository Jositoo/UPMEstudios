'use client';
import { useEffect, useState } from 'react';

const themes = [
  { id: 'dark', color: '#0a0d14', name: 'Oscuro (UPM)' },
  { id: 'midnight', color: '#0f172a', name: 'Medianoche' },
  { id: 'forest', color: '#064e3b', name: 'Bosque' },
  { id: 'berry', color: '#4a044e', name: 'Frambuesa' }
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('upm-theme');
    if (saved) {
      setCurrentTheme(saved);
      document.body.dataset.theme = saved;
    } else {
      document.body.dataset.theme = 'dark';
    }
  }, []);

  const changeTheme = (id: string) => {
    setCurrentTheme(id);
    document.body.dataset.theme = id;
    localStorage.setItem('upm-theme', id);
  };

  return (
    <div style={{ padding: '16px', display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
      {themes.map(t => (
        <button
          key={t.id}
          onClick={() => changeTheme(t.id)}
          title={t.name}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: t.color,
            border: currentTheme === t.id ? '2px solid white' : '2px solid transparent',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: currentTheme === t.id ? '0 0 10px rgba(255,255,255,0.2)' : 'none'
          }}
        />
      ))}
    </div>
  );
}
