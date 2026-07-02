'use client';
import React, { useState, useEffect } from 'react';
import Card from './Card';

interface StudyTimerProps {
  onSaveSession?: (durationMinutes: number) => void;
}

export default function StudyTimer({ onSaveSession }: StudyTimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0 && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  const toggle = () => setIsActive(!isActive);

  const reset = () => {
    setIsActive(false);
    setSeconds(0);
  };

  const save = () => {
    if (onSaveSession && seconds >= 60) {
      onSaveSession(Math.floor(seconds / 60));
    }
    reset();
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="study-timer" title="Temporizador de Estudio">
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <div style={{ 
          fontSize: '48px', 
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          color: isActive ? 'var(--accent-blue)' : 'var(--text-primary)',
          textShadow: isActive ? '0 0 20px var(--accent-blue-glow)' : 'none',
          marginBottom: '24px',
          fontVariantNumeric: 'tabular-nums'
        }}>
          {formatTime(seconds)}
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button className={isActive ? 'btn-secondary' : 'btn-primary'} onClick={toggle}>
            {isActive ? 'Pausar' : (seconds === 0 ? 'Iniciar' : 'Reanudar')}
          </button>
          <button className="btn-secondary" onClick={save} disabled={seconds < 60}>
            Guardar
          </button>
          <button className="btn-secondary" onClick={reset} style={{ opacity: 0.7 }}>
            Reset
          </button>
        </div>
      </div>
    </Card>
  );
}
