'use client';

import React, { useState } from 'react';
import Drawer from '@/components/ui/Drawer';
import { createEquipment } from '@/app/equipment/actions';

interface NewEquipmentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewEquipmentDrawer: React.FC<NewEquipmentDrawerProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await createEquipment(formData);
      if (result.success) {
        onClose();
        // The page will revalidate due to revalidatePath in the action
      } else {
        setError(result.error || 'Error al crear el equipo');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Nuevo Equipo Mayor">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '8px', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <div className="input-group">
          <label className="input-label">Nombre del Equipo</label>
          <input name="name" className="input-field" placeholder="Ej. Excavadora Hidráulica" required />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Marca</label>
            <input name="brand" className="input-field" placeholder="Ej. Caterpillar" required />
          </div>
          <div className="input-group">
            <label className="input-label">Modelo</label>
            <input name="model" className="input-field" placeholder="320 GC" required />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="input-group">
            <label className="input-label">Número de Serie</label>
            <input name="serialNumber" className="input-field" placeholder="CAT320..." required />
          </div>
          <div className="input-group">
            <label className="input-label">Año</label>
            <input name="year" type="number" className="input-field" defaultValue={2024} required />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Horas Iniciales</label>
          <input name="currentHours" type="number" step="0.1" className="input-field" defaultValue={0} required />
        </div>

        <div className="input-group">
          <label className="input-label">Estado Inicial</label>
          <select name="status" className="input-field" style={{ appearance: 'none' }}>
            <option value="OPERATIONAL">Operacional</option>
            <option value="MAINTENANCE">En Mantenimiento</option>
            <option value="DOWN">Fuera de Servicio</option>
          </select>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button type="button" onClick={onClose} className="btn btn-outline" style={{ flex: 1 }}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
            {loading ? 'Guardando...' : 'Crear Equipo'}
          </button>
        </div>
      </form>
    </Drawer>
  );
};

export default NewEquipmentDrawer;
