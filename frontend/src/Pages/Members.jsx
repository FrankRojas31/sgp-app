
import React from 'react';
import styles from '../css/members.module.css';

import TablaMiembros from '../Components/table_members';


function createData(id, name, team, speciality, job) {
  return { id, name, team, speciality, job };
}



export default function Members() {
  let user = 'Juan Mendoza';

  const menuItems = [
    { id: 1, label: 'Equipos' },
    { id: 2, label: 'Proyectos' },
    { id: 3, label: 'Miembros' },
  ];

  const rows = [
    createData('1','Agripino Hernández' , 'team demoledor', 'Programador', 1),
    createData('2','Agripino Hernández' , 'Esternocleidomastoideo', 'Diseñador', 7),
  ];



  return (
    <div>
      <div className={styles.sidebar}>
        <h2>SGP</h2>
        <span>Bienvenido, </span>
        <br />
        <div className={styles.userContainer}>

          <span>{user}</span>
        </div>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>
      </div>

      <div className={styles.content}>
        <h1>
          MIEMBROS
        </h1>

        <button className={styles.botonagregar}>
          Agregar
        </button>
        <TablaMiembros rows={rows} styles={styles} />
      </div>
    </div>
  );
}





