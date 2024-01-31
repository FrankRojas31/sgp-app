import { Sidebar } from '../dashboard/Sidebar';
import styles from '../../css/Bar.module.css';
import { Link } from 'react-router-dom';

export default function Bar() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <Link to="/PageFirstProject">
            <li>Proyectos</li>
            </Link>
            <Link to="/PageSecondProject">
              <li>Estadísticas</li>
            </Link>
          </ul>
        </nav>
      </header>
      <div className={styles['table-container']}>
      </div>
    </div>
  );
}
