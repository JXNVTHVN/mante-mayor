import React from 'react';
import { Bell, User, Search } from 'lucide-react';
import styles from './Header.module.css';

const Header = ({ title }: { title: string }) => {
  return (
    <header className={styles.header}>
      <div className={styles.titleSection}>
        <h1>{title}</h1>
      </div>

      <div className={styles.searchBar}>
        <Search size={18} className={styles.searchIcon} />
        <input type="text" placeholder="Buscar equipos, órdenes..." />
      </div>

      <div className={styles.actionSection}>
        <button className={styles.iconBtn}>
          <Bell size={20} />
          <span className={styles.badge} />
        </button>
        
        <div className={styles.userProfile}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Jonat Admin</span>
            <span className={styles.userRole}>Administrador</span>
          </div>
          <div className={styles.avatar}>
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
