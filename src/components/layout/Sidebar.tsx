'use client';

import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { 
  BarChart3, 
  Truck, 
  Wrench, 
  Settings, 
  Map, 
  ClipboardList, 
  LogOut, 
  Box 
} from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/dashboard' },
    { icon: Map, label: 'Flota Mapa', href: '/fleet-map' },
    { icon: Truck, label: 'Equipos', href: '/equipment' },
    { icon: ClipboardList, label: 'Órdenes', href: '/work-orders' },
    { icon: Wrench, label: 'Preventivos', href: '/preventive' },
    { icon: Box, label: 'Inventario', href: '/inventory' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarBrand}>
        <div className={styles.logoBox}>
          <Truck size={24} color="var(--primary-orange)" />
        </div>
        <span className={styles.brandName}>
          TITAN <span className={styles.brandMuted}>OPS</span>
        </span>
      </div>

      <nav className={styles.sidebarNav}>
        {menuItems.map((item) => (
          <Link key={item.label} href={item.href} className={styles.navItem}>
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <button 
          className={styles.logoutBtn}
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          <LogOut size={20} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
