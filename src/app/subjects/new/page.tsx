'use client';

import React, { useState } from 'react';
import Card from '../../../components/Card';
import { addSubject } from '../../actions';
import Link from 'next/link';
import { curriculum } from '@/lib/curriculum';

export default function NewSubjectPage() {
  const [selectedSubjectName, setSelectedSubjectName] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [credits, setCredits] = useState<number | string>('');
  const [semester, setSemester] = useState('');
  const [status, setStatus] = useState('ACTIVE');

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value;
    if (name === 'CUSTOM') {
      setIsCustom(true);
      setSelectedSubjectName('');
      setCredits('');
      setSemester('');
    } else {
      setIsCustom(false);
      setSelectedSubjectName(name);
      const subj = curriculum.find(c => c.name === name);
      if (subj) {
        setCredits(subj.credits);
        setSemester(subj.semester);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '32px' }}>Nueva Asignatura</h1>
        <Link href="/subjects" className="btn-secondary">Cancelar</Link>
      </header>

      <Card>
        <form action={addSubject} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Seleccionar Asignatura</label>
            <select className="input-premium" onChange={handleSubjectChange} defaultValue="" required={!isCustom}>
              <option value="" disabled>-- Elige una asignatura del plan --</option>
              {curriculum.map(subj => (
                <option key={subj.name} value={subj.name}>
                  {subj.name} ({subj.type} - {subj.credits} ECTS)
                </option>
              ))}
              <option value="CUSTOM">Otra asignatura (Manual)...</option>
            </select>
          </div>

          {isCustom && (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Nombre de la Asignatura</label>
              <input type="text" name="name" required className="input-premium" placeholder="Ej. Álgebra Avanzada" />
            </div>
          )}

          {!isCustom && selectedSubjectName && (
            <input type="hidden" name="name" value={selectedSubjectName} />
          )}

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Créditos ECTS</label>
              <input type="number" step="0.5" name="credits" required min="1" max="30" className="input-premium" value={credits} onChange={e => setCredits(e.target.value)} placeholder="6" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Semestre</label>
              <input type="text" name="semester" className="input-premium" value={semester} onChange={e => setSemester(e.target.value)} placeholder="Ej. 1º" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Estado</label>
              <select name="status" className="input-premium" value={status} onChange={e => setStatus(e.target.value)}>
                <option value="ACTIVE">Activa (En curso)</option>
                <option value="PASSED">Aprobada</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Convocatorias consumidas</label>
              <input type="number" name="attempts" defaultValue="1" min="1" className="input-premium" />
            </div>
          </div>

          {status === 'PASSED' && (
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Nota Final</label>
              <input type="number" step="0.1" name="finalGrade" required min="5" max="10" className="input-premium" placeholder="Ej. 7.5" />
            </div>
          )}

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Profesor</label>
              <input type="text" name="professor" className="input-premium" placeholder="Opcional" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Color</label>
              <input type="color" name="color" defaultValue="#3b82f6" style={{ width: '100%', height: '44px', padding: '2px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }} />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
            Guardar Asignatura
          </button>
        </form>
      </Card>
    </div>
  );
}
