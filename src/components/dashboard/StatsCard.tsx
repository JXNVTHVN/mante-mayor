'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './StatsCard.module.css';

interface StatsCardProps {
  label: string;
  value: string | number;
  iconName: keyof typeof LucideIcons;
  trend?: string;
  trendPositive?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, iconName, trend, trendPositive }) => {
  const Icon = (LucideIcons[iconName] as any) || LucideIcons.Activity;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="card"
    >
      <div className={styles.container}>
        <div className={styles.info}>
          <span className={styles.label}>{label}</span>
          <h3 className={styles.value}>{value}</h3>
          
          {trend && (
            <div className={`${styles.trendWrapper} ${trendPositive ? styles.positive : styles.negative}`}>
              {trendPositive ? <LucideIcons.TrendingUp size={14} /> : <LucideIcons.TrendingDown size={14} />}
              <span className={styles.trendValue}>{trend}</span>
              <span className={styles.trendLabel}>vs mes anterior</span>
            </div>
          )}
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.iconGlow} />
          <Icon size={24} className={styles.icon} />
        </div>
      </div>
      
      {/* Background Accent */}
      <div className={styles.cardAccent} />
    </motion.div>
  );
};

export default StatsCard;
