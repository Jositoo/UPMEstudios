'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface CreditsChartProps {
  passedCredits: number;
  totalCredits: number;
}

export default function CreditsChart({ passedCredits, totalCredits }: CreditsChartProps) {
  const remainingCredits = totalCredits - passedCredits;
  
  const data = [
    { name: 'Aprobados', value: passedCredits },
    { name: 'Restantes', value: remainingCredits > 0 ? remainingCredits : 0 },
  ];

  const COLORS = ['#10b981', 'rgba(255,255,255,0.1)'];

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%', minHeight: '200px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--bg-secondary)', 
              borderColor: 'var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)'
            }}
            itemStyle={{ color: 'var(--text-primary)' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
          {passedCredits}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          / {totalCredits} ECTS
        </div>
      </div>
    </div>
  );
}
