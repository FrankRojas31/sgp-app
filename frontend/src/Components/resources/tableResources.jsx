import{ useState } from 'react';
import { Add } from '@mui/icons-material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModeDeleteIcon from '@mui/icons-material/Delete';
import ModeSearchIcon from '@mui/icons-material/Search';

import styles from '../../css/MResources.module.css';
import Swal from 'sweetalert2';

export default function TableResource() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const datos = [
    { id: 1, name: 'Juan God', description: 'Especialista en Reclutamiento', speciality: 'Adquisición de Talento', hoursWorkDaily: 8 },
    { id: 2, name: 'Irvin God', description: 'Consultor de Recursos Humanos', speciality: 'Relaciones con los Empleados', hoursWorkDaily: 7.5 },
    { id: 3, name: 'Josue God', description: 'Coordinador de Capacitación', speciality: 'Desarrollo de Empleados', hoursWorkDaily: 8 },
    { id: 4, name: 'Emma God', description: 'Analista de Compensación', speciality: 'Compensación y Beneficios', hoursWorkDaily: 7.5 },
  ];


  const filteredDatos = datos.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Acciones 

  const HandleEdit = () =>{
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



  return (
    <div className={styles['main-container']}>
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
        <div className={styles.addButtonContainer}>
          <button className={styles.iconButton}>
            <Add style={{ color: '#2196f3' }} />
          </button>
        </div>
      </div>
      
      <table className={styles.table}>
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
              <td>{item.speciality}</td>
              <td>{item.hoursWorkDaily}</td>
              <td>
                <button className={styles.botoneseyb} onClick={HandleEdit}>
                  <ModeEditIcon sx={{ color: '#fff' }}/>
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
