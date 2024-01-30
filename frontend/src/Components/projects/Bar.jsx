// Bar.js
import React from 'react';
import { Sidebar } from '../dashboard/Sidebar';
import styles from '../../css/Bar.module.css';

export default function Bar() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>Proyectos</li>
            <li>Estadísticas</li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
