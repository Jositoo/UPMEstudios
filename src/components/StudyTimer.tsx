'use client';
import React, { useState, useEffect } from 'react';
import Card from './Card';
import { saveStudySession } from '../app/actions';

interface StudyTimerProps {
  subjects: { id: string; name: string }[];
}

export default function StudyTimer({ subjects }: StudyTimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(subjects.length > 0 ? subjects[0].id : '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    } else if (!isActive && seconds !== 0 && interval) {
      clearInterval(interval);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isActive, seconds]);

  const save = async () => {
    if (seconds >= 60 && selectedSubject) {
      setIsSaving(true);
      await saveStudySession(Math.floor(seconds / 60), selectedSubject);
      setIsSaving(false);
      setIsActive(false);
      setSeconds(0);
    }
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
        <div style={{ fontSize: '48px', fontWeight: 700, color: isActive ? 'var(--accent-blue)' : 'var(--text-primary)', marginBottom: '24px', fontVariantNumeric: 'tabular-nums' }}>
          {formatTime(seconds)}
        </div>
        
        {subjects.length > 0 ? (
          <select 
            value={selectedSubject} 
            onChange={e => setSelectedSubject(e.target.value)}
            style={{ marginBottom: '20px', padding: '8px', borderRadius: '6px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', width: '100%', maxWidth: '250px' }}
          >
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        ) : (
          <div style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Añade asignaturas para registrar tiempo.</div>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button className={isActive ? 'btn-secondary' : 'btn-primary'} onClick={() => setIsActive(!isActive)}>
            {isActive ? 'Pausar' : (seconds === 0 ? 'Iniciar' : 'Reanudar')}
          </button>
          <button className="btn-secondary" onClick={save} disabled={seconds < 60 || !selectedSubject || isSaving}>
            {isSaving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </Card>
  );
}