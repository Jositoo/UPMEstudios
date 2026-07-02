import React from 'react';
import Card from '../../../components/Card';
import { addSubject } from '../../actions';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function NewSubjectPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '32px' }}>Nueva Asignatura</h1>
        <Link href="/subjects" className="btn-secondary">Cancelar</Link>
      </header>

      <Card>
        <form action={addSubject} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Nombre de la Asignatura</label>
            <input type="text" name="name" required className="input-premium" placeholder="Ej. Cálculo II" />
          </div>
          
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Créditos ECTS</label>
              <input type="number" name="credits" required min="1" max="18" className="input-premium" placeholder="6" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Color</label>
              <input type="color" name="color" defaultValue="#3b82f6" style={{ width: '100%', height: '44px', padding: '2px', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '8px', cursor: 'pointer' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Profesor</label>
              <input type="text" name="professor" className="input-premium" placeholder="Opcional" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Semestre</label>
              <input type="text" name="semester" className="input-premium" placeholder="Ej. 1º Semestre" />
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
