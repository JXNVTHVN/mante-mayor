import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Wrench, 
  Calendar, 
  Clock, 
  Settings, 
  ChevronRight, 
  AlertTriangle 
} from 'lucide-react';

const PreventiveMaintenancePage = () => {
  const plans = [
    { 
      id: 1, 
      name: 'Cambio de Aceite 250h', 
      equipment: 'CAT 320 GC', 
      interval: '250 h', 
      nextDue: 'En 12 horas', 
      status: 'URGENT' 
    },
    { 
      id: 2, 
      name: 'Revisión Tren de Rodaje 1000h', 
      equipment: 'D65EX-18', 
      interval: '1000 h', 
      nextDue: '850 h / 1000 h', 
      status: 'ON_TRACK' 
    },
    { 
      id: 3, 
      name: 'Mantenimiento General Trimestral', 
      equipment: 'Volvo L120H', 
      interval: '90 días', 
      nextDue: 'En 5 días', 
      status: 'PENDING' 
    },
  ];

  return (
    <DashboardLayout title="Planes Preventivos">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Left Col: Summary & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3>Resumen Preventivo</h3>
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Mantenimientos esta semana</span>
                <span style={{ fontWeight: '700' }}>8</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Equipos en alerta</span>
                <span style={{ fontWeight: '700', color: 'var(--status-down)' }}>3</span>
              </div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
              <Calendar size={18} />
              Programar Servicio
            </button>
          </div>

          <div className="card" style={{ background: 'rgba(255, 152, 0, 0.05)', borderColor: 'var(--primary-orange)' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <AlertTriangle color="var(--primary-orange)" />
              <div>
                <h4 style={{ color: 'var(--primary-orange)' }}>Alerta Proactiva</h4>
                <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.8 }}>
                  El CAT 320 GC (CAT320GC001) superará las 250h en el próximo turno de trabajo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Plans List */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3>Planes de Mantenimiento Activos</h3>
            <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Configurar Planes</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                style={{ 
                  padding: '1.25rem', 
                  background: 'rgba(255, 255, 255, 0.02)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <div style={{ padding: '0.75rem', background: 'var(--bg-input)', borderRadius: '8px', color: 'var(--primary-orange)' }}>
                    <Settings size={20} />
                  </div>
                  <div>
                    <h4 style={{ margin: 0 }}>{plan.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{plan.equipment} • Intervalo: {plan.interval}</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Próximo</span>
                    <span style={{ 
                      fontWeight: '700', 
                      color: plan.status === 'URGENT' ? 'var(--status-down)' : 'inherit' 
                    }}>
                      {plan.nextDue}
                    </span>
                  </div>
                  <ChevronRight size={18} color="var(--text-muted)" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PreventiveMaintenancePage;
