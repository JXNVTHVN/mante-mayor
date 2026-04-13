'use client';

import React, { useState } from 'react';
import WorkOrderCard from './WorkOrderCard';
import NewWorkOrderDrawer from './NewWorkOrderDrawer';
import { Plus, Filter } from 'lucide-react';

interface WorkOrdersClientProps {
  initialWorkOrders: any[];
  equipmentList: any[];
}

const WorkOrdersClient: React.FC<WorkOrdersClientProps> = ({ initialWorkOrders, equipmentList }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline">
            <Filter size={18} />
            Filtrar por Estado
          </button>
        </div>
        
        <button className="btn btn-primary" onClick={() => setIsDrawerOpen(true)}>
          <Plus size={18} />
          Nueva Orden
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {initialWorkOrders.map((wo, index) => (
          <div key={wo.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <WorkOrderCard 
              orderNumber={wo.orderNumber}
              equipment={`${wo.equipment.name} (${wo.equipment.serialNumber})`}
              description={wo.description}
              assignedTo={wo.assignedTo?.name || 'Sin Asignar'}
              dueDate={wo.startDate ? wo.startDate.toLocaleDateString() : 'Pendiente'}
              priority={wo.priority}
              status={wo.status}
            />
          </div>
        ))}
        
        {initialWorkOrders.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
            No hay órdenes de trabajo registradas. Haga clic en "Nueva Orden" para comenzar.
          </div>
        )}
      </div>

      <NewWorkOrderDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        equipmentList={equipmentList}
      />
    </>
  );
};

export default WorkOrdersClient;
