import React from 'react';
import Card from '../../../components/Card';
import { addExam } from '../../actions';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function NewExamPage() {
  let subjects = [];
  try {
    subjects = await prisma.subject.findMany();
  } catch(e) {
    console.error("DB connection error");
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '32px' }}>Añadir Examen</h1>
        <Link href="/exams" className="btn-secondary">Cancelar</Link>
      </header>

      <Card>
        <form action={addExam} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Asignatura</label>
            <select name="subjectId" required className="input-premium" style={{ appearance: 'none', backgroundColor: 'var(--bg-secondary)' }}>
              <option value="" disabled selected>Selecciona una asignatura</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            {subjects.length === 0 && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>Primero debes crear una asignatura.</p>}
          </div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Tipo de Examen</label>
              <input type="text" name="type" required className="input-premium" placeholder="Ej. Parcial 1, Final, Práctica" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Fecha</label>
              <input type="date" name="date" required className="input-premium" />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Peso en la Nota Final (0.0 a 1.0)</label>
            <input type="number" name="weight" step="0.01" min="0.01" max="1" required className="input-premium" placeholder="Ej. 0.3 para 30%" />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '10px' }} disabled={subjects.length === 0}>
            Guardar Examen
          </button>
        </form>
      </Card>
    </div>
  );
}
