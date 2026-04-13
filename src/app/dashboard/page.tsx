import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import prisma from '@/lib/prisma';
import { 
  FleetPerformanceChart, 
  StatusDistributionChart, 
  MaintenanceCostChart 
} from '@/components/dashboard/DashboardCharts';
import { 
  Bell,
  ShieldCheck
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const DashboardPage = async () => {
  // 1. Fetch live metrics from Prisma
  const [totalEquipment, operationalCount, criticalCount, openOrdersCount, logs] = await Promise.all([
    prisma.equipment.count(),
    prisma.equipment.count({ where: { status: 'OPERATIONAL' } }),
    prisma.equipment.count({ where: { status: 'DOWN' } }),
    prisma.workOrder.count({ where: { status: { not: 'COMPLETED' } } }),
    prisma.maintenanceLog.findMany({
      include: { workOrder: { include: { equipment: true } } },
      take: 5,
      orderBy: { createdAt: 'desc' }
    })
  ]);

  const availabilityFactor = totalEquipment > 0 ? (operationalCount / totalEquipment) * 100 : 100;

  return (
    <DashboardLayout title="Centro de Mando Titan">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Top KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          <StatsCard 
            label="Disponibilidad Flota" 
            value={`${availabilityFactor.toFixed(1)}%`}
            iconName="Activity" 
            trend="Live" 
            trendPositive={true} 
          />
          <StatsCard 
            label="Equipos Activos" 
            value={operationalCount}
            iconName="Truck" 
            trend={`${totalEquipment} Total`}
            trendPositive={true} 
          />
          <StatsCard 
            label="Órdenes Abiertas" 
            value={openOrdersCount}
            iconName="Zap" 
            trend="Activo" 
            trendPositive={false} 
          />
          <StatsCard 
            label="Alertas Críticas" 
            value={criticalCount}
            iconName="TriangleAlert" 
            trend="Sync" 
            trendPositive={false} 
          />
        </div>

        {/* Main Analytics Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          <div className="card glass-panel" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>Rendimiento Operativo</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Análisis de disponibilidad vs tiempo de inactividad</p>
              </div>
            </div>
            <FleetPerformanceChart />
          </div>

          <div className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Distribución de Estado</h2>
            <StatusDistributionChart />
            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Equipos DOWN</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--status-down)' }}>{criticalCount}</div>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Efectividad</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>98%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Details Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr', gap: '1.5rem' }}>
          {/* Recent Activity */}
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bell size={18} color="var(--primary-orange)" /> Registro de Actividad
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {logs.map((log) => (
                <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{log.workOrder.equipment.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.message}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                      {log.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
              {logs.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Esperando nueva actividad...
                </div>
              )}
            </div>
          </div>

          {/* Maintenance Costs */}
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Costos de Mantenimiento</h2>
            <MaintenanceCostChart />
          </div>

          {/* System Health */}
          <div className="card glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{ fontSize: '1.1rem' }}>Estado del Sistema</h2>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} className="status-pulse" />
                <span style={{ fontSize: '0.9rem' }}>Telemetría Activa</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} className="status-pulse" />
                <span style={{ fontSize: '0.9rem' }}>Datos Reales: Prisma</span>
              </div>
              
              <div style={{ marginTop: 'auto', padding: '1.5rem', background: 'rgba(255, 157, 0, 0.05)', borderRadius: '16px', border: '1px solid rgba(255, 157, 0, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <ShieldCheck size={20} color="var(--primary-orange)" />
                  <span style={{ fontWeight: '700', fontSize: '0.875rem' }}>Integridad Titan</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sincronización bidireccional activada al 100%.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
