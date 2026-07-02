'use client';
import React, { useState, useEffect } from 'react';
import Card from './Card';
import { saveStudySession } from '../app/actions';

interface StudyTimerProps {
  subjects: { id: string; name: string }[];
}

export default function StudyTimer({ subjects }: StudyTimerProps) {
  const [mode, setMode] = useState<'timer' | 'manual'>('timer');
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(subjects.length > 0 ? subjects[0].id : '');
  const [isSaving, setIsSaving] = useState(false);
  
  // Manual state
  const [manualHours, setManualHours] = useState('');
  const [manualMinutes, setManualMinutes] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && mode === 'timer') {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    } else if (!isActive && seconds !== 0 && interval) {
      clearInterval(interval);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isActive, seconds, mode]);

  const saveTimer = async () => {
    if (seconds >= 60 && selectedSubject) {
      setIsSaving(true);
      await saveStudySession(Math.floor(seconds / 60), selectedSubject);
      setIsSaving(false);
      setIsActive(false);
      setSeconds(0);
    }
  };

  const saveManual = async () => {
    const h = parseInt(manualHours) || 0;
    const m = parseInt(manualMinutes) || 0;
    const totalMinutes = (h * 60) + m;
    
    if (totalMinutes > 0 && selectedSubject) {
      setIsSaving(true);
      await saveStudySession(totalMinutes, selectedSubject);
      setIsSaving(false);
      setManualHours('');
      setManualMinutes('');
    }
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="study-timer" title="Registro de Estudio">
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
        <button 
          onClick={() => setMode('timer')}
          style={{ 
            background: mode === 'timer' ? 'rgba(255,255,255,0.1)' : 'transparent',
            border: '1px solid ' + (mode === 'timer' ? 'var(--accent-blue)' : 'var(--border-color)'),
            color: mode === 'timer' ? 'var(--accent-blue)' : 'var(--text-muted)',
            padding: '6px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 600
          }}>
          ⏱️ Cronómetro
        </button>
        <button 
          onClick={() => setMode('manual')}
          style={{ 
            background: mode === 'manual' ? 'rgba(255,255,255,0.1)' : 'transparent',
            border: '1px solid ' + (mode === 'manual' ? 'var(--accent-blue)' : 'var(--border-color)'),
            color: mode === 'manual' ? 'var(--accent-blue)' : 'var(--text-muted)',
            padding: '6px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 600
          }}>
          ✍️ Manual
        </button>
      </div>

      <div style={{ textAlign: 'center', padding: '10px 0' }}>
        {subjects.length > 0 ? (
          <select 
            value={selectedSubject} 
            onChange={e => setSelectedSubject(e.target.value)}
            style={{ marginBottom: '24px', padding: '10px', borderRadius: '8px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', width: '100%', maxWidth: '280px', fontSize: '15px' }}
          >
            {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        ) : (
          <div style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Añade asignaturas para registrar tiempo.</div>
        )}

        {mode === 'timer' ? (
          <>
            <div style={{ fontSize: '48px', fontWeight: 700, color: isActive ? 'var(--accent-blue)' : 'var(--text-primary)', marginBottom: '24px', fontVariantNumeric: 'tabular-nums' }}>
              {formatTime(seconds)}
            </div>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className={isActive ? 'btn-secondary' : 'btn-primary'} onClick={() => setIsActive(!isActive)}>
                {isActive ? 'Pausar' : (seconds === 0 ? 'Iniciar' : 'Reanudar')}
              </button>
              <button className="btn-secondary" onClick={saveTimer} disabled={seconds < 60 || !selectedSubject || isSaving}>
                {isSaving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="number" 
                  min="0" 
                  placeholder="0"
                  value={manualHours}
                  onChange={e => setManualHours(e.target.value)}
                  style={{ width: '80px', height: '60px', fontSize: '32px', textAlign: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)' }}
                />
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Horas</span>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', paddingBottom: '24px' }}>:</div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="number" 
                  min="0" 
                  max="59"
                  placeholder="0"
                  value={manualMinutes}
                  onChange={e => setManualMinutes(e.target.value)}
                  style={{ width: '80px', height: '60px', fontSize: '32px', textAlign: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)' }}
                />
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Minutos</span>
              </div>
            </div>
            <button className="btn-primary" onClick={saveManual} disabled={(!manualHours && !manualMinutes) || isSaving || !selectedSubject}>
              {isSaving ? 'Guardando...' : 'Añadir Tiempo'}
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}