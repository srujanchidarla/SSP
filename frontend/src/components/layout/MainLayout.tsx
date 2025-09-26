// src/components/layout/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
};

export default MainLayout;