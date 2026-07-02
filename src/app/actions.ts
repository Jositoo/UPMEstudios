'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function addSubject(formData: FormData) {
  const name = formData.get('name') as string;
  const credits = parseFloat(formData.get('credits') as string);
  const color = formData.get('color') as string || '#3B82F6';
  const semester = formData.get('semester') as string;
  const professor = formData.get('professor') as string;
  const status = formData.get('status') as string || 'ACTIVE';
  const attempts = parseInt(formData.get('attempts') as string) || 1;
  const finalGradeRaw = formData.get('finalGrade') as string;
  const finalGrade = finalGradeRaw ? parseFloat(finalGradeRaw) : null;
  
  if (!name || isNaN(credits)) return;

  await prisma.subject.create({
    data: { name, credits, color, semester, professor, status, attempts, finalGrade }
  });
  
  revalidatePath('/subjects');
  revalidatePath('/');
  redirect('/subjects');
}

export async function addExam(formData: FormData) {
  const subjectId = formData.get('subjectId') as string;
  const type = formData.get('type') as string;
  const date = new Date(formData.get('date') as string);
  const weight = parseFloat(formData.get('weight') as string);
  
  if (!subjectId || !type || !date || isNaN(weight)) return;

  await prisma.exam.create({
    data: { subjectId, type, date, weight }
  });
  
  revalidatePath('/exams');
  revalidatePath('/');
  redirect('/exams');
}

export async function updateExamGrade(examId: string, grade: number) {
  await prisma.exam.update({
    where: { id: examId },
    data: { grade }
  });
  revalidatePath('/exams');
  revalidatePath('/subjects');
}

export async function saveStudySession(duration: number, subjectId?: string) {
  if (!subjectId) return; // For now we need a subject to save a session
  await prisma.studySession.create({
    data: { duration, subjectId, date: new Date() }
  });
  revalidatePath('/');
  revalidatePath('/analytics');
}

export async function updateSubjectGrade(subjectId: string, finalGrade: number) {
  const status = finalGrade >= 5 ? 'PASSED' : 'ACTIVE';
  await prisma.subject.update({
    where: { id: subjectId },
    data: { finalGrade, status }
  });
  revalidatePath('/subjects');
  revalidatePath('/');
}
