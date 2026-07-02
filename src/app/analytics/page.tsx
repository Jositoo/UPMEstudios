'use client';
import React from 'react';
import Card from '../../components/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const data = [
  { name: 'Lun', horas: 2.5 },
  { name: 'Mar', horas: 3.8 },
  { name: 'Mié', horas: 1.5 },
  { name: 'Jue', horas: 4.2 },
  { name: 'Vie', horas: 3.0 },
  { name: 'Sáb', horas: 6.5 },
  { name: 'Dom', horas: 5.0 },
];

export default function AnalyticsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Estadísticas 📈</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Visualiza tu rendimiento y tiempo de estudio.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
        <Card>
          <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>Total Horas (Semana)</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--accent-blue)' }}>26h 30m</div>
        </Card>
        <Card>
          <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>Asignatura Más Estudiada</div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent-yellow)', marginBottom: '4px' }}>Cálculo II</div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>12h esta semana</div>
        </Card>
        <Card>
          <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>Racha Actual</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#10b981' }}>5 Días 🔥</div>
        </Card>
      </div>

      <Card title="Tiempo de Estudio (Últimos 7 días)" className="h-96">
        <div style={{ height: '400px', width: '100%', marginTop: '20px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-muted)" tick={{fill: 'var(--text-muted)'}} />
              <YAxis stroke="var(--text-muted)" tick={{fill: 'var(--text-muted)'}} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                itemStyle={{ color: 'var(--accent-blue)', fontWeight: 600 }}
              />
              <Bar dataKey="horas" fill="var(--accent-blue)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
