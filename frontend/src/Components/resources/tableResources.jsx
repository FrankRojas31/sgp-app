import { useState } from 'react';
import { Add } from '@mui/icons-material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModeDeleteIcon from '@mui/icons-material/Delete';
import ModeSearchIcon from '@mui/icons-material/Search';

import styles from '../../css/Hresources.module.css';
import Swal from 'sweetalert2';

export default function TableResource() {
  const [searchTerm, setSearchTerm] = useState('');

  const datos = [
    { id: 1, name: 'Juan God', description: 'Especialista en Reclutamiento', speciality: 'Capacitación y desarrollo', hoursWorkDaily: 8 },
    { id: 2, name: 'Irvin God', description: 'Consultor de Recursos Humanos', speciality: 'Especialista en seguridad informática', hoursWorkDaily: 7.5 },
    { id: 3, name: 'Josue God', description: 'Coordinador de Capacitación', speciality: 'Especialista en seguridad informática', hoursWorkDaily: 8 },
    { id: 4, name: 'Emma God', description: 'Analista de Compensación', speciality: 'Especialista en calidad de software', hoursWorkDaily: 7.5 },
  ];


  const filteredDatos = datos.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Acciones 

  const HandleEdit = () => {
    Swal.fire({
      title: 'Editar Miembro',
      html: `
            <input id="name" class="swal2-input" placeholder="Nombre" value="${miembro.name}">
            <input id="description" class="swal2-input" placeholder="Equipo" value="${miembro.team}">
            <input id="speciality" class="swal2-input" placeholder="Especialidad" value="${miembro.speciality}">
            <input id="hoursWorkDaily" class="swal2-input" placeholder="Cargo de Trabajo" value="${miembro.job}">
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
  const handleAgregarClick = () => {
    Swal.fire({
      title: 'Agregar Recurso Humano',
      html: `
      <input id="nombre" class="swal2-input" placeholder="Nombre">
      <input id="equipo" class="swal2-input" placeholder="Descripcion">
      <select id="especialidad" class="swal2-select">
      <option value="Capacitación y desarrollo" style="background-color: #00ff00; color: #FFFFFF; font-size: 14px;">Capacitación y desarrollo</option>
      <option value="Desarrollador" style="background-color: #0000ff; color: #FFFFFF; font-size: 14px;">Desarrollador</option>
      <option value="Diseñador" style="background-color: #ffff00; color: #000000; font-size: 14px;">Diseñador</option>
      <option value="Analista de datos" style="background-color: #ff00ff; color: #FFFFFF; font-size: 14px;">Analista de datos</option>
      <option value="Especialista en seguridad informática" style="background-color: #00ffff; color: #000000; font-size: 14px;">Especialista en seguridad informática</option>
      <option value="Ingeniero de sistemas" style="background-color: #800080; color: #FFFFFF; font-size: 14px;">Ingeniero de sistemas</option>
      <option value="Gerente de proyectos de software" style="background-color: #008080; color: #FFFFFF; font-size: 14px;">Gerente de proyectos de software</option>
      <option value="Especialista en calidad de software" style="background-color: #ff4500; color: #FFFFFF; font-size: 14px;">Especialista en calidad de software</option>
      <option value="Especialista en integración de sistemas" style="background-color: #32cd32; color: #FFFFFF; font-size: 14px;">Especialista en integración de sistemas</option>
    </select>
    
      <input id="cargo" class="swal2-input" placeholder="Horas Diarias Trabajadas">
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
    <div className={styles.maincontainer}>
      <div className={styles.toolbar}>
        <div className={styles.box}>
          <form name="search" className={styles.form}>
            <input type="text" className={styles.input}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Buscar por nombre' />
          </form>
          <i className="fas fa-search"></i>

        </div>
        <div className={styles.contenedor}>
          <button className={styles.botonagregar} onClick={handleAgregarClick}>
            Agregar
          </button>
        </div>
      </div>

      <table className={`${styles.table} ${styles.roundedTable}`}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Especialidad</th>
            <th>Horas diarias Trabajadas </th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filteredDatos.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? styles.even : ''}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td><button className={styles.botonSpeciality} style={{ backgroundColor: getColorByRole(item.speciality) }}>
                {item.speciality}
              </button></td>
              <td>{item.hoursWorkDaily}</td>
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

const getColorByRole = (rol) => {
  switch (rol) {
    case 'Gestión del desempeño':
      return '#ff0000';
    case 'Capacitación y desarrollo':
      return '#00ff00';
    case 'Desarrollador':
      return '#0000ff';
    case 'Diseñador':
      return '#ffff00';
    case 'Analista de datos':
      return '#ff00ff';
    case 'Especialista en seguridad informática':
      return '#00ffff';
    case 'Ingeniero de sistemas':
      return '#800080';
    case 'Gerente de proyectos de software':
      return '#008080';
    case 'Especialista en calidad de software':
      return '#ff4500';
    case 'Especialista en integración de sistemas':
      return '#32cd32';
    default:
      return '#000000';
  }
};
