'use client';

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { motion } from 'framer-motion';

const performanceData = [
  { name: 'Lun', disponibilidad: 92, costo: 1200 },
  { name: 'Mar', disponibilidad: 94, costo: 900 },
  { name: 'Mie', disponibilidad: 88, costo: 2500 },
  { name: 'Jue', disponibilidad: 95, costo: 1100 },
  { name: 'Vie', disponibilidad: 96, costo: 800 },
  { name: 'Sab', disponibilidad: 93, costo: 1400 },
  { name: 'Dom', disponibilidad: 97, costo: 600 },
];

const statusData = [
  { name: 'Operativo', value: 35, color: '#10b981' },
  { name: 'Mantenimiento', value: 5, color: '#f59e0b' },
  { name: 'Fuera de Servicio', value: 2, color: '#ef4444' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ 
        background: 'rgba(20, 23, 29, 0.9)', 
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '1rem',
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
      }}>
        <p style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} style={{ color: entry.color, fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
            <span>{entry.name}:</span>
            <span style={{ fontWeight: 600 }}>{entry.value}{entry.unit || ''}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const FleetPerformanceChart = () => {
  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <AreaChart data={performanceData}>
          <defs>
            <linearGradient id="colorDisp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff9d00" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#ff9d00" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            dy={10}
          />
          <YAxis 
            stroke="#64748b" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            type="monotone" 
            dataKey="disponibilidad" 
            stroke="#ff9d00" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorDisp)" 
            name="Disponibilidad"
            unit="%"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const StatusDistributionChart = () => {
  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={statusData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            animationBegin={0}
            animationDuration={1500}
          >
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={(value) => <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const MaintenanceCostChart = () => {
  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <BarChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#64748b" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="costo" fill="rgba(59, 130, 246, 0.5)" radius={[4, 4, 0, 0]} name="Costo" unit="$" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
