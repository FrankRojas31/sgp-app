import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faFolder, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from '../css/Sidebar.module.css';
import user_default from '/images/user_default.jpeg';

function Sidebar() {
  let user = 'Juan Mendoza';

  const menuItems = [
    { id: 1, label: 'Equipos', icon: faUsers, legend: 'Administrar Equipos' },
    { id: 2, label: 'Proyectos', icon: faFolder, legend: 'Gestionar Proyectos' },
    { id: 3, label: 'Miembros', icon: faUser, legend: 'Administrar miembros' },
  ];

  return (
    <div>
      <div className={styles.sidebar}>
        <h2>SGP</h2>
        <text>Bienvenido, </text>
        <br />
        <div className={styles.userContainer}>
          <img src={user_default} alt="not allowed" />
          <span>{user}</span>
        </div>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <FontAwesomeIcon icon={item.icon} className={styles.icons} />
              {item.label}
              <div className={styles.legend}>{item.legend}</div>
            </li>
          ))}
        </ul>
        <div className={styles.bottomtext}>
          Cerrar Sesión
        </div>
      </div>


    </div>
  );
}

export default Sidebar;

