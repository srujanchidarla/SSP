// src/components/layout/Navigation.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingCart, ScanLine, History } from 'lucide-react';
import styles from './Navigation.module.css';
import cn from '../../utils/cn';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
  { href: '/scan', label: 'Scan', icon: ScanLine, isCentral: true },
  { href: '/history', label: 'History', icon: History },
];

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  styles.navLink,
                  isActive ? styles.active : '',
                  item.isCentral && styles.central
                )
              }
            >
              <div className={styles.iconWrapper}>
                <Icon size={item.isCentral ? 32 : 24} />
              </div>
              {!item.isCentral && (
                 <span className={styles.label}>{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;