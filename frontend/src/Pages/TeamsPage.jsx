import styles from '../css/targetTeam.module.css';
import { Sidebar } from '../Components/dashboard/Sidebar';
import TargetTeam from '../Components/targetTeam';
function TeamsPage() {


  return (
    <div>
      <Sidebar />
      <div className={styles.content}>
        <h1>
          EQUIPOS
        </h1>

        <button className={styles.botonagregar}>
          Agregar
        </button>

        <TargetTeam />

      </div>

    </div>
  );
}

export default TeamsPage;





