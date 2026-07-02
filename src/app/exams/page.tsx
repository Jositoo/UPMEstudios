import React from 'react';
import Card from '../../components/Card';
import SubjectBadge from '../../components/SubjectBadge';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ExamsPage() {
  let exams: any[] = [];
  try {
    exams = await prisma.exam.findMany({
      include: { subject: true },
      orderBy: { date: 'asc' }
    });
  } catch(e) {
    console.error("DB not connected");
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Control de Exámenes 📅</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Calendario y cálculo de medias.</p>
        </div>
        <Link href="/exams/new" className="btn-primary" style={{ display: 'inline-block', textAlign: 'center' }}>
          + Añadir Examen
        </Link>
      </header>

      <Card title="Todos los Exámenes">
        {exams.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            <p>No tienes exámenes registrados.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Fecha</th>
                <th style={{ padding: '12px' }}>Asignatura</th>
                <th style={{ padding: '12px' }}>Tipo</th>
                <th style={{ padding: '12px' }}>Peso</th>
                <th style={{ padding: '12px' }}>Nota</th>
              </tr>
            </thead>
            <tbody>
              {exams.map(exam => {
                const dateStr = exam.date.toISOString().split('T')[0];
                return (
                  <tr key={exam.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '16px 12px', fontWeight: 500 }}>
                      {dateStr.split('-').reverse().join('/')}
                    </td>
                    <td style={{ padding: '16px 12px' }}><SubjectBadge name={exam.subject.name} color={exam.subject.color} /></td>
                    <td style={{ padding: '16px 12px' }}>{exam.type}</td>
                    <td style={{ padding: '16px 12px' }}>{exam.weight * 100}%</td>
                    <td style={{ padding: '16px 12px', fontWeight: 600, color: exam.grade !== null ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                      {exam.grade !== null ? exam.grade : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
