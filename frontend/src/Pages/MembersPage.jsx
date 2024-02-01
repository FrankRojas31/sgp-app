import { useState } from 'react';
import styles from '../css/members.module.css';
import Swal from 'sweetalert2';

import TablaMiembros from '../Components/table_members';
import { Sidebar } from '../Components/dashboard/Sidebar';

function createData(id, name, team, speciality, job) {

  return { id, name, team, speciality, job };
}

export default function Members() {
  const initialRows = [
    createData('1', 'Agripino Hernández', 'team demoledor', 'Programador', 1),
    createData('2', 'Agripino Hernández', 'Esternocleidomastoideo', 'Diseñador', 7),
    createData('2', 'Agripino Hernández', 'Esternocleidomastoideo', 'ProjectManajer', 7),

  ];

  const [rows, setRows] = useState(initialRows);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAgregarClick = () => {
    Swal.fire({
      title: 'Agregar Miembro',
      html: `
      <input id="nombre" class="swal2-input" placeholder="Nombre">
      <input id="equipo" class="swal2-input" placeholder="Equipo">
      <select id="especialidad" class="swal2-select">
        <option value="Programador" style="background-color: #1E90FF; color: #FFFFFF;">Programador</option>
        <option value="Diseñador" style="background-color: #32CD32; color: #FFFFFF;">Diseñador</option>
        <option value="Analista" style="background-color: #FFA500; color: #FFFFFF;">Analista</option>
        <option value="Administrador" style="background-color: #8B008B; color: #FFFFFF;">Administrador</option>
        <option value="ProjectManager" style="background-color: #FF4500; color: #FFFFFF;">ProjectManager</option>
      </select>
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.content}>
      <Sidebar />
      <div className={styles.mainContent}>
        <h1>MIEMBROS</h1>

        <div className={styles.box}>
          <form name="search" className={styles.form}>
            <input type="text" className={styles.input}
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder='Buscar por nombre' />
          </form>
          <i className="fas fa-search"></i>

        </div>

<div className={styles.contenedor}>
        <button className={styles.botonagregar} onClick={handleAgregarClick}>
          Agregar
        </button>
        </div>
        <TablaMiembros rows={filteredRows} styles={styles} />
      </div>
    </div>
  );
}
