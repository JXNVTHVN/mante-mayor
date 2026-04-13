import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import prisma from '@/lib/prisma';
import { 
  Package, 
  AlertOctagon, 
  TrendingUp, 
  Search, 
  Plus, 
  Filter,
  ArrowUpDown,
  MoreVertical,
  Layers
} from 'lucide-react';
import styles from './Inventory.module.css';

export const dynamic = 'force-dynamic';

const InventoryPage = async () => {
  const parts = await prisma.part.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const totalParts = parts.length;
  const lowStockParts = parts.filter(p => p.stock <= p.minStock).length;
  const totalValue = parts.reduce((acc, p) => acc + (p.stock * (p.price || 0)), 0);

  return (
    <DashboardLayout title="Gestión de Inventario">
      {/* Search and Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={18} />
          <input 
            type="text" 
            placeholder="Buscar por No. de Parte o Nombre..." 
            className="input-field"
            style={{ paddingLeft: '2.8rem', width: '100%', borderRadius: '12px' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={18} /> Filtros
          </button>
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Añadir Repuesto
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(255, 152, 0, 0.1)', padding: '1rem', borderRadius: '12px' }}>
            <Package color="var(--primary-orange)" size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Repuestos Totales</span>
            <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>{totalParts}</div>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ background: lowStockParts > 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px' }}>
            <AlertOctagon color={lowStockParts > 0 ? '#ef4444' : '#10b981'} size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Stock Bajo</span>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', color: lowStockParts > 0 ? '#ef4444' : 'inherit' }}>{lowStockParts}</div>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '12px' }}>
            <TrendingUp color="#3b82f6" size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Valor del Inventario</span>
            <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>${totalValue.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Parts List */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <Layers size={20} color="var(--primary-orange)" />
          <h2 style={{ fontSize: '1.25rem' }}>Listado de Refacciones</h2>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>No. Parte</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Descripción</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                  Stock <ArrowUpDown size={12} />
                </th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Precio Unit.</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Estado</th>
                <th style={{ padding: '1rem' }}></th>
              </tr>
            </thead>
            <tbody>
              {parts.map((part) => {
                const isLow = part.stock <= part.minStock;
                const isVeryLow = part.stock === 0;

                return (
                  <tr key={part.id} style={{ borderBottom: '1px solid var(--border-color)' }} className={styles.hoverRow}>
                    <td style={{ padding: '1rem' }}>
                      <code style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                        {part.partNumber}
                      </code>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: '600' }}>{part.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{part.description}</div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
                        <span style={{ fontSize: '1rem', fontWeight: '700' }}>{part.stock}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>/ {part.minStock} min</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: '500' }}>${part.price?.toFixed(2)}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.6rem', 
                        borderRadius: '20px', 
                        fontSize: '0.7rem', 
                        fontWeight: '700',
                        background: isVeryLow ? 'rgba(239, 68, 68, 0.1)' : (isLow ? 'rgba(245, 158, 11, 0.1)' : 'rgba(16, 185, 129, 0.1)'),
                        color: isVeryLow ? '#ef4444' : (isLow ? '#f59e0b' : '#10b981'),
                        border: `1px solid ${isVeryLow ? 'rgba(239, 68, 68, 0.2)' : (isLow ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)')}`
                      }}>
                        {isVeryLow ? 'AGOTADO' : (isLow ? 'REORDENAR' : 'STOCK OK')}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button className={styles.btnIcon} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InventoryPage;
