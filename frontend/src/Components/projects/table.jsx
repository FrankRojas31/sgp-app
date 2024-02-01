import { useState } from 'react';
import { Add } from '@mui/icons-material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModeDeleteIcon from '@mui/icons-material/Delete';
import ModeSearchIcon from '@mui/icons-material/Search';

import styles from '../../css/table.module.css';
import Swal from 'sweetalert2';

export default function TableProject() {
  const [searchTerm, setSearchTerm] = useState('');

  const datos = [
    { id: 1, nombre: 'Juan God', descripcion: 'Agua', Fecha_Inicio: 'Enero', Recurso: '$450' },
    { id: 2, nombre: 'Irvin God', descripcion: 'Luz', Fecha_Inicio: 'Febrero', Recurso: '$450' },
    { id: 3, nombre: 'Josue God', descripcion: 'Coche', Fecha_Inicio: 'Marzo', Recurso: '$450' },
    { id: 4, nombre: 'Emma God', descripcion: 'Internet', Fecha_Inicio: 'Abril', Recurso: '$450' },
  ];

  const filteredDatos = datos.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Acciones

  const HandleEdit = () => {
    Swal.fire({
      title: 'Editar Miembro',
      html: `
            <input id="nombre" class="swal2-input" placeholder="Nombre" value="${miembro.name}">
            <input id="equipo" class="swal2-input" placeholder="Equipo" value="${miembro.team}">
            <input id="especialidad" class="swal2-input" placeholder="Especialidad" value="${miembro.speciality}">
            <input id="cargo" class="swal2-input" placeholder="Cargo de Trabajo" value="${miembro.job}">
          `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    })
  }

  const HandleRemove = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    })
  }

  return (
    <div className={styles['main-container']}>
      <h1>PROYECTOS </h1>
      <div className={styles.toolbar}>
      <div className={styles.box}>
          <form name="search">
            <input type="text" className={styles.input}
              value={searchTerm}
              onChange={""}
              placeholder='Buscar por nombre' />
          </form>
          <i className="fas fa-search"></i>

        </div>
        <div className={styles.addButtonContainer}>
          <button className={styles.iconButton}>
            <Add style={{ color: '#2196f3' }} />
          </button>
        </div>
      </div>

      <table className={`${styles.table} ${styles.roundedTable}`}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha de Inicio</th>
            <th>Recurso Asignado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filteredDatos.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? styles.even : ''}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.descripcion}</td>
              <td>{item.Fecha_Inicio}</td>
              <td>{item.Recurso}</td>
              <td>
                <button className={styles.botoneseyb} onClick={HandleEdit}>
                  <ModeEditIcon sx={{ color: '#fff' }} />
                </button>
                <button className={styles.botoneseyb} onClick={HandleRemove}>
                  <ModeDeleteIcon style={{ color: '#fff' }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
