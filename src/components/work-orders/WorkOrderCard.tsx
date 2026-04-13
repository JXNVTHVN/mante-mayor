import React from 'react';
import { 
  ClipboardList, 
  User, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ArrowRight 
} from 'lucide-react';
import styles from './WorkOrderCard.module.css';

interface WorkOrderCardProps {
  orderNumber: string;
  equipment: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  priority: number; // 1: Low, 2: Medium, 3: High, 4: Critical
  status: string; // PENDING, IN_PROGRESS, COMPLETED, CANCELLED
}

const WorkOrderCard: React.FC<WorkOrderCardProps> = ({
  orderNumber, equipment, description, assignedTo, dueDate, priority, status
}) => {
  const statusConfig: Record<string, any> = {
    PENDING: { icon: Clock, color: '#f59e0b', label: 'Pendiente' },
    IN_PROGRESS: { icon: Clock, color: '#3b82f6', label: 'En Progreso' },
    COMPLETED: { icon: CheckCircle2, color: '#10b981', label: 'Completada' },
    CANCELLED: { icon: AlertTriangle, color: '#64748b', label: 'Cancelada' },
  };

  const priorityConfig: Record<number, any> = {
    1: { color: '#10b981', label: 'Baja' },
    2: { color: '#f59e0b', label: 'Media' },
    3: { color: '#f97316', label: 'Alta' },
    4: { color: '#ef4444', label: 'CRÍTICA' },
  };

  const statusInfo = statusConfig[status] || statusConfig.PENDING;
  const priorityInfo = priorityConfig[priority] || priorityConfig[1];

  return (
    <div className="card">
      <div className={styles.header}>
        <div className={styles.topInfo}>
          <span className={styles.orderNumber}>#{orderNumber}</span>
          <div className={styles.priorityBadge}>
            <div className={styles.dot} style={{ background: priorityInfo.color }} />
            <span>Prioridad {priorityInfo.label}</span>
          </div>
        </div>
        <div className={styles.statusBadge} style={{ color: statusInfo.color, border: `1px solid ${statusInfo.color}` }}>
          <statusInfo.icon size={12} />
          {statusInfo.label}
        </div>
      </div>

      <h3 className={styles.equipmentName}>{equipment}</h3>
      <p className={styles.description}>{description}</p>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <User size={14} />
          <span>{assignedTo}</span>
        </div>
        <div className={styles.metaItem}>
          <Calendar size={14} />
          <span>{dueDate}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <button className={styles.detailsBtn}>
          Gestionar Orden
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default WorkOrderCard;
