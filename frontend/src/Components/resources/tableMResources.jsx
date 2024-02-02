import{ useState } from 'react';
import { Add } from '@mui/icons-material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModeDeleteIcon from '@mui/icons-material/Delete';
import ModeSearchIcon from '@mui/icons-material/Search';

import styles from '../../css/Mresources.module.css';
import Swal from 'sweetalert2';

export default function TableMaterialResource() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const datos = [
    { id: 1, name: 'Juan God', description: 'Especialista en Reclutamiento', quantity_available: 'Adquisición de Talento' },
    { id: 2, name: 'Irvin God', description: 'Consultor de Recursos Humanos', quantity_available: 'Relaciones con los Empleados'},
    { id: 3, name: 'Josue God', description: 'Coordinador de Capacitación', quantity_available: 'Desarrollo de Empleados'},
    { id: 4, name: 'Emma God', description: 'Analista de Compensación', quantity_available: 'Compensación y Beneficios'},
    { id: 4, name: 'Emma God', description: 'Analista de Compensación', quantity_available: 'Compensación y Beneficios'},
     { id: 4, name: 'Emma God', description: 'Analista de Compensación', quantity_available: 'Compensación y Beneficios'},
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
            <input id="description" class="swal2-input" placeholder="Equipo" value="${miembro.description}">
            <input id="quantity_available" class="swal2-input" placeholder="Especialidad" value="${miembro.quantity_available}">
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
      <input id="cargo" class="swal2-input" placeholder="Cantidad Disponible">
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
      
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Cantidad Disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filteredDatos.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? styles.even : ''}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.quantity_available}</td>
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

const getColorByRole = (role) => {
  switch (role) {
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
