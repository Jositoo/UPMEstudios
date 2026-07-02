import React from 'react';
import Card from '../components/Card';
import SubjectBadge from '../components/SubjectBadge';
import StudyTimer from '../components/StudyTimer';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let subjects: any[] = [];
  let nextExam: any = null;
  try {
    subjects = await prisma.subject.findMany({
      include: { exams: true }
    });
    
    nextExam = await prisma.exam.findFirst({
      where: { date: { gte: new Date() } },
      orderBy: { date: 'asc' },
      include: { subject: true }
    });
  } catch(e) {
    console.error("DB not connected");
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Hola, Naranjo 👋</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Aquí está el resumen de tu rendimiento en la UPM.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <Card title="Horas de Estudio (Hoy)">
          <div style={{ fontSize: '36px', fontWeight: 700, color: 'var(--accent-blue)' }}>0h 0m</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>
            Empieza una sesión para registrar tiempo.
          </p>
        </Card>
        
        <Card title="Próximo Examen">
          {nextExam ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SubjectBadge name={nextExam.subject.name} color={nextExam.subject.color} size="medium" />
                <span style={{ fontWeight: 600 }}>{nextExam.date.toISOString().split('T')[0].split('-').reverse().join('/')}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                {nextExam.type}
              </p>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>No tienes exámenes próximos.</p>
          )}
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <StudyTimer />
          
          <Card title="Asignaturas Activas">
            {subjects.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No hay asignaturas registradas.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {subjects.slice(0, 4).map((subj, i) => {
                  const gradedExams = subj.exams.filter((e: any) => e.grade !== null);
                  let media = '--';
                  if (gradedExams.length > 0) {
                    const totalWeight = gradedExams.reduce((acc: number, e: any) => acc + e.weight, 0);
                    const weightedSum = gradedExams.reduce((acc: number, e: any) => acc + (e.grade * e.weight), 0);
                    if (totalWeight > 0) media = (weightedSum / totalWeight).toFixed(2);
                  }

                  return (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: i < Math.min(subjects.length-1, 3) ? '1px solid var(--border-color)' : 'none' }}>
                      <SubjectBadge name={subj.name} color={subj.color} />
                      <span style={{ fontWeight: 600, color: media === '--' ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                        {media}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
        
        <Card title="Rendimiento Semanal">
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            Empieza a registrar horas de estudio para ver gráficos aquí.
          </div>
        </Card>
      </div>
    </div>
  );
}
