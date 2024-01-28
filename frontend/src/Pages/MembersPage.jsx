
import React, { useState } from 'react';
import styles from '../css/members.module.css';
import Swal from 'sweetalert2';

import TablaMiembros from '../Components/table_members';
import Sidebar from '../Components/Side-Bar';

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

  const [rows, setRows] = useState([
    createData('1', 'Agripino Hernández', 'team demoledor', 'Programador', 1),
    createData('2', 'Agripino Hernández', 'Esternocleidomastoideo', 'Diseñador', 7),
  ]);

  const handleAgregarClick = () => {
    Swal.fire({
      title: 'Agregar Miembro',
      html: `
        <input id="nombre" class="swal2-input" placeholder="Nombre">
        <input id="equipo" class="swal2-input" placeholder="Equipo">
        <input id="especialidad" class="swal2-input" placeholder="Especialidad">
        <input id="cargo" class="swal2-input" placeholder="Cargo de Trabajo">
      `,
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nombre = Swal.getPopup().querySelector('#nombre').value;
        const equipo = Swal.getPopup().querySelector('#equipo').value;
        const especialidad = Swal.getPopup().querySelector('#especialidad').value;
        const cargo = Swal.getPopup().querySelector('#cargo').value;

        const nuevaFila = createData(rows.length + 1, nombre, equipo, especialidad, cargo);
        setRows([...rows, nuevaFila]);


        return true;
      },
    });
  };




  return (
    <div>
      <Sidebar/>
      <div className={styles.content}>
        <h1>
          MIEMBROS
        </h1>

        <button className={styles.botonagregar} onClick={handleAgregarClick}>
          Agregar
        </button>
        <TablaMiembros rows={rows} styles={styles} />
      </div>
    </div>
  );
}





