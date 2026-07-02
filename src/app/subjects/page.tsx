import React from 'react';
import Card from '../../components/Card';
import SubjectBadge from '../../components/SubjectBadge';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function SubjectsPage() {
  let subjects: any[] = [];
  try {
    subjects = await prisma.subject.findMany({
      include: { exams: true }
    });
  } catch (e) {
    console.error("Error fetching subjects. DB likely not connected yet.");
  }

  const activeSubjects = subjects.filter(s => s.status === 'ACTIVE' || !s.status);
  const passedSubjects = subjects.filter(s => s.status === 'PASSED');

  const renderSubjectCard = (subject: any) => {
    const isPassed = subject.status === 'PASSED';
    let gradeDisplay = '--';
    let gradeColor = 'var(--text-primary)';

    if (isPassed) {
      gradeDisplay = subject.finalGrade ? subject.finalGrade.toFixed(2) : '--';
      gradeColor = subject.finalGrade && subject.finalGrade >= 5 ? '#10b981' : '#ef4444';
    } else {
      const gradedExams = subject.exams.filter((e: any) => e.grade !== null);
      if (gradedExams.length > 0) {
        const totalWeight = gradedExams.reduce((acc: number, e: any) => acc + e.weight, 0);
        const weightedSum = gradedExams.reduce((acc: number, e: any) => acc + (e.grade * e.weight), 0);
        if (totalWeight > 0) {
          const media = weightedSum / totalWeight;
          gradeDisplay = media.toFixed(2);
          gradeColor = media >= 5 ? '#10b981' : '#ef4444';
        }
      }
    }

    return (
      <Card key={subject.id}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <SubjectBadge name={subject.name} color={subject.color} size="large" />
          {subject.attempts > 1 && (
            <span style={{ backgroundColor: '#ef444420', color: '#ef4444', padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 600 }}>
              {subject.attempts}ª Conv.
            </span>
          )}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Créditos (ECTS)</div>
            <div style={{ fontWeight: 600 }}>{subject.credits}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Semestre</div>
            <div style={{ fontWeight: 600 }}>{subject.semester || '-'}</div>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Profesor</div>
            <div style={{ fontWeight: 600 }}>{subject.professor || '-'}</div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{isPassed ? 'Nota Final' : 'Nota Media Actual'}</div>
            <div style={{ fontWeight: 700, fontSize: '20px', color: gradeDisplay !== '--' ? gradeColor : 'var(--text-primary)' }}>
              {gradeDisplay} {gradeDisplay !== '--' && '/ 10'}
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Mis Asignaturas 📚</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Gestiona tus asignaturas y créditos de la UPM.</p>
        </div>
        <Link href="/subjects/new" className="btn-primary" style={{ display: 'inline-block', textAlign: 'center' }}>
          + Nueva Asignatura
        </Link>
      </header>

      {subjects.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            <p>No tienes asignaturas registradas todavía.</p>
            <p>Haz clic en "Nueva Asignatura" para empezar.</p>
          </div>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {activeSubjects.length > 0 && (
            <div>
              <h2 style={{ fontSize: '20px', marginBottom: '16px', color: 'var(--text-primary)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>En Curso (Activas)</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                {activeSubjects.map(renderSubjectCard)}
              </div>
            </div>
          )}

          {passedSubjects.length > 0 && (
            <div>
              <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#10b981', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>Aprobadas 🎉</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                {passedSubjects.map(renderSubjectCard)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
