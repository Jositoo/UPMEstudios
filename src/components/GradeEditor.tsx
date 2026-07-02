'use client';

import React, { useState } from 'react';
import { updateSubjectGrade } from '../app/actions';

interface GradeEditorProps {
  subjectId: string;
  initialGrade: string;
  isPassed: boolean;
  gradeColor: string;
}

export default function GradeEditor({ subjectId, initialGrade, isPassed, gradeColor }: GradeEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [grade, setGrade] = useState(initialGrade !== '--' ? initialGrade : '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (grade.trim() === '') {
      setIsEditing(false);
      return;
    }
    
    const parsed = parseFloat(grade.replace(',', '.'));
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 10) {
      setLoading(true);
      await updateSubjectGrade(subjectId, parsed);
      setLoading(false);
      setIsEditing(false);
    } else {
      alert("Por favor, introduce una nota válida entre 0 y 10.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <input
          type="text"
          value={grade}
          onChange={e => setGrade(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          disabled={loading}
          placeholder="Ej: 7.5"
          style={{
            width: '70px',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--accent-blue)',
            color: 'var(--text-primary)',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '18px',
            fontWeight: 700,
            outline: 'none'
          }}
        />
        <button
          onClick={handleSave}
          disabled={loading}
          style={{
            background: 'var(--accent-blue)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 10px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          {loading ? '...' : '✓'}
        </button>
      </div>
    );
  }

  return (
    <div 
      style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
      className="grade-editor-group"
      onClick={() => setIsEditing(true)}
      title="Haz clic para modificar la nota final"
    >
      <div style={{ fontWeight: 700, fontSize: '20px', color: initialGrade !== '--' ? gradeColor : 'var(--text-primary)' }}>
        {initialGrade} {initialGrade !== '--' && '/ 10'}
      </div>
      <div style={{ 
        opacity: 0.5, 
        fontSize: '14px', 
        background: 'rgba(255,255,255,0.1)', 
        padding: '2px 8px', 
        borderRadius: '12px',
        transition: 'opacity 0.2s ease'
      }}
      className="edit-hint"
      >
        ✏️ Calificar
      </div>
    </div>
  );
}
