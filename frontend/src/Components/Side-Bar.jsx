import styles from '../css/Sidebar.module.css';
import user_default from '/images/user_default.jpeg';

function Sidebar() {
  let user = 'Juan Mendoza';

  const menuItems = [
    { id: 1, label: 'Equipos' },
    { id: 2, label: 'Proyectos' },
    { gid: 3, label: 'Miembros' },
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
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>
        <div className="Martgin">
            cerrar
        </div>
      </div>


    </div>
  );
}

export default Sidebar;
