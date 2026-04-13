'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Truck, MapPin, AlertTriangle } from 'lucide-react';
import '@/styles/leaflet-custom.css';

// Dynamic import for Leaflet to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const FleetMapPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Fix for Leaflet marker icons in Next.js
    import('leaflet').then((L) => {
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/marker-icon-2x.png',
        iconUrl: '/marker-icon.png',
        shadowUrl: '/marker-shadow.png',
      });
    });
  }, []);

  const fleetData = [
    { id: 1, name: 'Excavadora CAT 320', pos: [19.4326, -99.1332], status: 'OPERATIONAL' },
    { id: 2, name: 'Bulldozer D65', pos: [19.4350, -99.1400], status: 'MAINTENANCE' },
    { id: 3, name: 'Volvo L120H', pos: [19.4400, -99.1300], status: 'OPERATIONAL' },
    { id: 4, name: 'Motoniveladora 670G', pos: [19.4500, -99.1500], status: 'DOWN' },
  ];

  if (!isClient) return null;

  return (
    <DashboardLayout title="Localización de Flota">
      <div className="card" style={{ padding: 0, overflow: 'hidden', height: 'calc(100vh - 200px)' }}>
        <div style={{ height: '100%', width: '100%' }}>
          <MapContainer 
            center={[19.4326, -99.1332]} 
            zoom={13} 
            style={{ height: '100%', width: '100%', background: 'var(--bg-deep)' }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {fleetData.map((item) => (
              <Marker key={item.id} position={item.pos as any}>
                <Popup>
                  <div style={{ color: '#000' }}>
                    <strong>{item.name}</strong><br />
                    Estado: {item.status}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
        <div className="card" style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
            <Truck color="var(--status-operational)" size={20} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Operacionales</span>
            <div style={{ fontWeight: '700' }}>26 unidades</div>
          </div>
        </div>
        <div className="card" style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
            <AlertTriangle color="var(--status-down)" size={20} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Alertas Críticas</span>
            <div style={{ fontWeight: '700' }}>2 unidades</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FleetMapPage;
