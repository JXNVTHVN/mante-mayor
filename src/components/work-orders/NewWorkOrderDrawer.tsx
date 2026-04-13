'use client';

import React, { useState } from 'react';
import Drawer from '@/components/ui/Drawer';
import { createWorkOrder } from '@/app/work-orders/actions';

interface NewWorkOrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  equipmentList: { id: string, name: string, serialNumber: string }[];
}

const NewWorkOrderDrawer: React.FC<NewWorkOrderDrawerProps> = ({ isOpen, onClose, equipmentList }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await createWorkOrder(formData);
      if (result.success) {
        onClose();
      } else {
        setError(result.error || 'Error al crear la orden');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Nueva Orden de Trabajo">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '8px', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <div className="input-group">
          <label className="input-label">Seleccionar Equipo</label>
          <select name="equipmentId" className="input-field" style={{ appearance: 'none' }} required>
            <option value="">Seleccione un activo...</option>
            {equipmentList.map(eq => (
              <option key={eq.id} value={eq.id}>{eq.name} ({eq.serialNumber})</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label className="input-label">Descripción del Problema / Trabajo</label>
          <textarea 
            name="description" 
            className="input-field" 
            rows={4} 
            placeholder="Describa detalladamente el mantenimiento o falla..." 
            required 
            style={{ resize: 'none' }}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Prioridad</label>
          <select name="priority" className="input-field" style={{ appearance: 'none' }}>
            <option value="1">Baja</option>
            <option value="2">Media</option>
            <option value="3">Alta</option>
            <option value="4">Crítica</option>
          </select>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button type="button" onClick={onClose} className="btn btn-outline" style={{ flex: 1 }}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
            {loading ? 'Generando...' : 'Crear Orden'}
          </button>
        </div>
      </form>
    </Drawer>
  );
};

export default NewWorkOrderDrawer;
