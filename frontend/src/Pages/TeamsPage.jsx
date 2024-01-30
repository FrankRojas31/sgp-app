import styles from '../css/targetTeam.module.css';
import { Sidebar } from '../Components/dashboard/Sidebar';
import TargetTeam from '../Components/targetTeam';

function TeamsPage() {
  return (
    <div className={styles.pageContainer}> {/* Contenedor Principal */}
      <Sidebar />
      <div className={styles.mainContainer}> {/* Contenido Principal */}
        <h1>EQUIPOS</h1>
        <button className={styles.botonagregar}> Agregar </button>
        <TargetTeam />
      </div>
    </div>
  );
}

export default TeamsPage;
