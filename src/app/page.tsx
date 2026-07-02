import React from 'react';
import Card from '../components/Card';
import SubjectBadge from '../components/SubjectBadge';
import StudyTimer from '../components/StudyTimer';
import CreditsChart from '../components/CreditsChart';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let subjects: any[] = [];
  let nextExam: any = null;
  let todaySessions: any[] = [];
  try {
    subjects = await prisma.subject.findMany({
      include: { exams: true }
    });
    
    nextExam = await prisma.exam.findFirst({
      where: { date: { gte: new Date() } },
      orderBy: { date: 'asc' },
      include: { subject: true }
    });

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    todaySessions = await prisma.studySession.findMany({
      where: { date: { gte: startOfToday } }
    });
  } catch(e) {
    console.error("DB Error in page.tsx:", e);
  }

  const passedCredits = subjects
    .filter(s => s.status === 'PASSED')
    .reduce((acc, s) => acc + s.credits, 0);
  
  const totalDegreeCredits = 240; // Default for Grado

  const totalMinutesToday = todaySessions.reduce((acc, session) => acc + session.duration, 0);
  const hoursToday = Math.floor(totalMinutesToday / 60);
  const minsToday = totalMinutesToday % 60;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Hola, Naranjo 👋</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Aquí está el resumen de tu rendimiento en la UPM.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        <Card title="Horas de Estudio (Hoy)">
          <div style={{ fontSize: '36px', fontWeight: 700, color: 'var(--accent-blue)' }}>{hoursToday}h {minsToday}m</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px' }}>
            {totalMinutesToday > 0 ? '¡Buen trabajo! Sigue así.' : 'Empieza una sesión para registrar tiempo.'}
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
          <StudyTimer subjects={subjects.map(s => ({ id: s.id, name: s.name }))} />
          
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
        <Card title="Progreso de la Titulación (ECTS)">
          <div style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CreditsChart passedCredits={passedCredits} totalCredits={totalDegreeCredits} />
          </div>
        </Card>
      </div>
    </div>
  );
}
