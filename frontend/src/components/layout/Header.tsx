// src/components/layout/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle2 } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          SmartScan Pro
        </Link>
        <nav>
          <Link
            to="/profile"
            className={styles.profileLink}
            aria-label="User Profile"
          >
            <UserCircle2 />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;