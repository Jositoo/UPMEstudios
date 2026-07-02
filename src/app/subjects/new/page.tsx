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
  const [activeCourseTab, setActiveCourseTab] = useState<number>(1);

  const handleSelectSubject = (name: string) => {
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

  const courses = [1, 2, 3, 4, 5];
  const courseNames = ['1º Curso', '2º Curso', '3º Curso', '4º Curso', 'Optativas'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px' }}>Añadir Asignaturas</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Selecciona las asignaturas de tu plan de estudios.</p>
        </div>
        <Link href="/subjects" className="btn-secondary">Volver</Link>
      </header>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {/* Lado izquierdo: Selector visual de asignaturas */}
        <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Tabs de cursos */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
            {courses.map((course, idx) => (
              <button
                key={course}
                type="button"
                onClick={() => setActiveCourseTab(course)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: '1px solid',
                  borderColor: activeCourseTab === course ? 'var(--accent-blue)' : 'var(--border-color)',
                  backgroundColor: activeCourseTab === course ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-secondary)',
                  color: activeCourseTab === course ? 'var(--accent-blue)' : 'var(--text-primary)',
                  fontWeight: activeCourseTab === course ? 600 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                {courseNames[idx]}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleSelectSubject('CUSTOM')}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px dashed var(--border-color)',
                backgroundColor: 'transparent',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              + Otra (Manual)
            </button>
          </div>

          {/* Grid de tarjetas de asignaturas */}
          {!isCustom && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
              {curriculum.filter(s => s.course === activeCourseTab).map(subj => {
                const isSelected = selectedSubjectName === subj.name;
                return (
                  <div
                    key={subj.name}
                    onClick={() => handleSelectSubject(subj.name)}
                    style={{
                      border: '2px solid',
                      borderColor: isSelected ? 'var(--accent-blue)' : 'var(--border-color)',
                      backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.05)' : 'var(--bg-secondary)',
                      borderRadius: '12px',
                      padding: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '14px', lineHeight: '1.4' }}>{subj.name}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{subj.credits} ECTS</span>
                      <span style={{ fontSize: '11px', padding: '2px 6px', backgroundColor: 'var(--bg-primary)', borderRadius: '4px', color: 'var(--text-secondary)' }}>{subj.semester}</span>
                    </div>
                    {isSelected && (
                      <div style={{ position: 'absolute', top: '-8px', right: '-8px', width: '20px', height: '20px', backgroundColor: 'var(--accent-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                        ✓
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Lado derecho: Formulario de configuración (Fijo o sticky) */}
        <div style={{ flex: '1 1 350px', position: 'sticky', top: '24px', height: 'fit-content' }}>
          <Card title={selectedSubjectName || (isCustom ? "Nueva Asignatura Manual" : "Configurar Asignatura")}>
            {(!selectedSubjectName && !isCustom) ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <p>Haz clic en una de las tarjetas de la izquierda para seleccionarla.</p>
              </div>
            ) : (
              <form action={addSubject} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
                {isCustom && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>Nombre de la Asignatura</label>
                    <input type="text" name="name" required className="input-premium" placeholder="Ej. Álgebra Avanzada" />
                  </div>
                )}

                {!isCustom && selectedSubjectName && (
                  <input type="hidden" name="name" value={selectedSubjectName} />
                )}

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>Créditos ECTS</label>
                    <input type="number" step="0.5" name="credits" required min="1" max="30" className="input-premium" value={credits} onChange={e => setCredits(e.target.value)} placeholder="6" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>Semestre</label>
                    <input type="text" name="semester" className="input-premium" value={semester} onChange={e => setSemester(e.target.value)} placeholder="Ej. 1º" />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>Estado</label>
                    <select name="status" className="input-premium" value={status} onChange={e => setStatus(e.target.value)}>
                      <option value="ACTIVE">Activa (En curso)</option>
                      <option value="PASSED">Aprobada</option>
                    </select>
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>Nº Convocatorias</label>
                    <input type="number" name="attempts" defaultValue="1" min="1" className="input-premium" />
                  </div>
                </div>

                {status === 'PASSED' && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>Nota Final</label>
                    <input type="number" step="0.1" name="finalGrade" required min="5" max="10" className="input-premium" placeholder="Ej. 7.5" />
                  </div>
                )}

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ flex: 2 }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>Profesor</label>
                    <input type="text" name="professor" className="input-premium" placeholder="Opcional" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>Color</label>
                    <input type="color" name="color" defaultValue="#3b82f6" style={{ width: '100%', height: '44px', padding: '2px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }} />
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
                  Guardar Asignatura
                </button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
