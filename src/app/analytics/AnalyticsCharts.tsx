'use client';
import React from 'react';
import Card from '../../components/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function AnalyticsCharts({ passedCredits, subjects }: { passedCredits: number, subjects: any[] }) {
  const pieData = [
    { name: 'Créditos Aprobados', value: passedCredits, color: '#10b981' },
    { name: 'Créditos Pendientes', value: Math.max(0, 240 - passedCredits), color: 'rgba(255,255,255,0.1)' }
  ];

  const barData = subjects
    .filter(s => s.status === 'PASSED' && s.finalGrade)
    .map(s => ({
      name: s.name.substring(0, 15) + (s.name.length > 15 ? '...' : ''),
      nota: s.finalGrade,
      fullTitle: s.name
    }))
    .sort((a, b) => b.nota - a.nota);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
      <Card title="Progreso del Grado (240 ECTS)">
        <div style={{ height: '300px', width: '100%', position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ fontWeight: 600 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 700, color: '#10b981' }}>
              {Math.round((passedCredits / 240) * 100)}%
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Completado</div>
          </div>
        </div>
      </Card>

      <Card title="Notas de Asignaturas Aprobadas">
        <div style={{ height: '300px', width: '100%', marginTop: '20px' }}>
          {barData.length === 0 ? (
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              Aún no hay notas registradas.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" tick={{fill: 'var(--text-muted)', fontSize: 12}} />
                <YAxis stroke="var(--text-muted)" tick={{fill: 'var(--text-muted)'}} domain={[0, 10]} />
                <RechartsTooltip 
                  formatter={(value: number) => [`${value} / 10`, 'Nota Final']}
                  labelFormatter={(label, payload) => payload?.[0]?.payload?.fullTitle || label}
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: 'var(--accent-blue)', fontWeight: 600 }}
                />
                <Bar dataKey="nota" fill="var(--accent-blue)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </div>
  );
}
