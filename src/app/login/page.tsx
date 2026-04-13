'use client';

import React, { useState } from 'react';
import { Truck, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/dashboard',
      });

      if (result?.error) {
        setError('Credenciales invalidas. Intente de nuevo.');
        setLoading(false);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('Ocurrió un error en el servidor. Intente más tarde.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <div className={styles.brandHeader}>
          <div className={styles.logoBox}>
            <Truck size={32} color="var(--primary-orange)" />
          </div>
          <h1 className={styles.brandName}>TITAN <span className={styles.brandMuted}>OPS</span></h1>
          <p className={styles.subtitle}>Gestión de Mantenimiento de Equipo Mayor</p>
        </div>

        {error && (
          <div className={styles.errorBanner}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Correo Electrónico</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={18} />
              <input 
                type="email" 
                className="input-field" 
                placeholder="admin@titan.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                style={{ paddingLeft: '2.8rem', width: '100%' }}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Contraseña</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={18} />
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="input-field" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                style={{ paddingLeft: '2.8rem', width: '100%' }}
              />
              <button 
                type="button" 
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className={styles.formFooter}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              <span>Recordarme</span>
            </label>
            <a href="#" className={styles.forgotPassword}>¿Olvidó su contraseña?</a>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? <Loader2 className={styles.spin} size={20} /> : 'Iniciar Sesión'}
          </button>
        </form>

        <div className={styles.footer}>
          <span>&copy; 2024 Titan Maintenance System</span>
        </div>
      </div>
      
      {/* Background patterns */}
      <div className={styles.bgOverlay} />
      <div className={styles.bgPattern} />
    </div>
  );
};

export default LoginPage;
