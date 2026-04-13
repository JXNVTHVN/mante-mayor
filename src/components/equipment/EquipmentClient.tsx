'use client';

import React, { useState } from 'react';
import EquipmentCard from '@/components/equipment/EquipmentCard';
import NewEquipmentDrawer from '@/components/equipment/NewEquipmentDrawer';
import { Plus, Filter, Search } from 'lucide-react';

interface EquipmentClientProps {
  initialEquipment: any[];
}

const EquipmentClient: React.FC<EquipmentClientProps> = ({ initialEquipment }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="searchBar" style={{ position: 'relative', minWidth: '300px' }}>
            <input 
              className="input-field" 
              placeholder="Buscar por nombre, marca o serie..." 
              style={{ width: '100%', paddingLeft: '2.5rem' }}
            />
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
          </div>
          <button className="btn btn-outline">
            <Filter size={18} />
            Filtros
          </button>
        </div>
        
        <button className="btn btn-primary" onClick={() => setIsDrawerOpen(true)}>
          <Plus size={18} />
          Nuevo Equipo
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {initialEquipment.map((item, index) => (
          <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <EquipmentCard 
              name={item.name}
              brand={item.brand}
              model={item.model}
              serial={item.serialNumber}
              hours={item.currentHours}
              status={item.status}
              lastService={item.lastService?.toLocaleDateString()}
            />
          </div>
        ))}
      </div>

      <NewEquipmentDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default EquipmentClient;
