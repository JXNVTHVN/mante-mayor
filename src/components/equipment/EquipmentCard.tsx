import React from 'react';
import { Truck, Zap, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import styles from './EquipmentCard.module.css';

interface EquipmentCardProps {
  name: string;
  brand: string;
  model: string;
  serial: string;
  hours: number;
  status: 'OPERATIONAL' | 'MAINTENANCE' | 'DOWN' | 'RETIRED';
  lastService?: string;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ 
  name, brand, model, serial, hours, status, lastService 
}) => {
  const statusConfig = {
    OPERATIONAL: { icon: CheckCircle2, color: 'var(--status-operational)', label: 'Operacional' },
    MAINTENANCE: { icon: Clock, color: 'var(--status-maintenance)', label: 'En Servicio' },
    DOWN: { icon: AlertCircle, color: 'var(--status-down)', label: 'Fuera de Servicio' },
    RETIRED: { icon: Zap, color: 'var(--status-retired)', label: 'Retirado' },
  };

  const { icon: StatusIcon, color, label } = statusConfig[status];

  return (
    <div className="card">
      <div className={styles.header}>
        <div className={styles.brandInfo}>
          <span className={styles.brand}>{brand}</span>
          <h3 className={styles.name}>{name}</h3>
          <span className={styles.model}>{model} | SN: {serial}</span>
        </div>
        <div className={styles.statusBadge} style={{ color, background: `${color}15` }}>
          <StatusIcon size={14} />
          <span>{label}</span>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Horas Motor</span>
          <span className={styles.statValue}>{hours.toLocaleString()} h</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Último Servicio</span>
          <span className={styles.statValue}>{lastService || 'N/A'}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <button className="btn btn-outline" style={{ flex: 1, fontSize: '0.8rem' }}>Detalles</button>
        <button className="btn btn-primary" style={{ flex: 1, fontSize: '0.8rem' }}>Programar</button>
      </div>
    </div>
  );
};

export default EquipmentCard;
