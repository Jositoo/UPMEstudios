import React from 'react';
import Card from '../../components/Card';
import { prisma } from '@/lib/prisma';
import AnalyticsCharts from './AnalyticsCharts';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  let subjects: any[] = [];
  try {
    subjects = await prisma.subject.findMany();
  } catch (e) {
    console.error("DB not connected yet.");
  }

  const passedSubjects = subjects.filter(s => s.status === 'PASSED');
  const passedCredits = passedSubjects.reduce((acc, curr) => acc + curr.credits, 0);
  
  let mediaGlobal = '--';
  const gradedSubjects = passedSubjects.filter(s => s.finalGrade !== null);
  if (gradedSubjects.length > 0) {
    const sum = gradedSubjects.reduce((acc, curr) => acc + curr.finalGrade, 0);
    mediaGlobal = (sum / gradedSubjects.length).toFixed(2);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Estadísticas del Grado 📈</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Visualiza tu progreso hacia el título.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        <Card>
          <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>Créditos Superados</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--accent-blue)' }}>
            {passedCredits} <span style={{ fontSize: '20px', color: 'var(--text-muted)', fontWeight: 500 }}>/ 240</span>
          </div>
        </Card>
        
        <Card>
          <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>Asignaturas Aprobadas</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#10b981' }}>
            {passedSubjects.length}
          </div>
        </Card>

        <Card>
          <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>Nota Media Global (Expediente)</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--accent-yellow)' }}>
            {mediaGlobal} <span style={{ fontSize: '20px', color: 'var(--text-muted)', fontWeight: 500 }}>/ 10</span>
          </div>
        </Card>
      </div>

      <AnalyticsCharts passedCredits={passedCredits} subjects={subjects} />
    </div>
  );
}
