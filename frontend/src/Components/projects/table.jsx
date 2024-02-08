import { useEffect, useState } from 'react';
import { Add } from '@mui/icons-material';
import DOMPurify from 'dompurify';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModeDeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../../css/table.module.css';
import Swal from 'sweetalert2';
import { sgpApi } from '../../api/sgpApi';

export default function TableProject() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchActive, setSearchActive] = useState(false); 
  const [proyectos, setProyectos] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchButtonClick = () => {
    setSearchActive(true);
  };

  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    setSearchActive(true);
  };

  // Logica para traer datos de la api.

  const RecargarDatos = async () => {
    try {
      const respuesta = await sgpApi.get('/projects');
      const datos = respuesta.data
        .filter(project => project.isActive === true)
        .map(project => ({
          id: project.id,
          nombre: project.name,
          descripcion: project.description,
          Fecha_Inicio: project.startDate,
          Fecha_Fin: project.endDate,
          Activo: project.isActive
        }));
  
      setProyectos(datos);
    } catch (error) {
      console.log(`Se detectó un error al cargar los proyectos: ${error}`);
    }
  };  

  useEffect(() => {
    RecargarDatos();
  }, [proyectos]);

  const HandleEdit = async (project) => {
    try {
      const result = await Swal.fire({
        title: 'Editar Proyecto',
        html: `
          <input id="nombre" class="swal2-input" placeholder="Nombre" value="${project.nombre}" required>
          <input id="descripcion" class="swal2-input" placeholder="Descripción" value="${project.descripcion}" required>
          <input id="startDate" class="swal2-input" type="date" placeholder="Fecha de Inicio" value="${project.Fecha_Inicio}" required>
          <input id="endDate" class="swal2-input" type="date" placeholder="Fecha de Fin" value="${project.Fecha_Fin}" required>
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: async () => {
          const nombre = DOMPurify.sanitize(Swal.getPopup().querySelector('#nombre').value);
          const descripcion = DOMPurify.sanitize(Swal.getPopup().querySelector('#descripcion').value);
          const startDate = DOMPurify.sanitize(Swal.getPopup().querySelector('#startDate').value);
          const endDate = DOMPurify.sanitize(Swal.getPopup().querySelector('#endDate').value);
  
          if (!nombre.trim() || !descripcion.trim() || !startDate || !endDate) {
            Swal.showValidationMessage('Todos los campos son obligatorios');
          } else if (startDate > endDate) {
            Swal.showValidationMessage('La fecha de inicio no puede ser posterior a la fecha de fin');
          } else {
            try {
              await sgpApi.patch(`/projects/${project.id}`, {
                name: nombre,
                description: descripcion,
                startDate: startDate,
                endDate: endDate,
              });
  
              return { nombre, descripcion, startDate, endDate };
            } catch (error) {
              console.error('Error al actualizar el proyecto:', error);
              Swal.fire('Error', 'Hubo un problema al actualizar el proyecto.', 'error');
            }
          }
        },
      });
  
      if (result.isConfirmed) {
        RecargarDatos();
        Swal.fire('Actualizado', 'El proyecto ha sido actualizado correctamente.', 'success');
      }
    } catch (error) {
      console.error('Error al abrir el modal de edición:', error);
    }
  };

  const HandleRemove = async (id) => {

    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, desactivar',
        cancelButtonText: 'Cancelar'
      });
  
      if (result.isConfirmed) {
        RecargarDatos();
        await sgpApi.delete(`/projects/${id}`);
        Swal.fire('Eliminado', 'El proyecto ha sido eliminado.', 'success');
        
      }
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
      Swal.fire('Error', 'Hubo un problema al eliminar el proyecto.', 'error');
    }
  };

  const HandleAdd = async () => {
    try {
      const result = await Swal.fire({
        title: 'Agregar Proyecto',
        html: `
          <input id="nombre" class="swal2-input" placeholder="Nombre" required>
          <input id="descripcion" class="swal2-input" placeholder="Descripción" required>
          <input id="startDate" class="swal2-input" type="date" placeholder="Fecha de Inicio" required>
          <input id="endDate" class="swal2-input" type="date" placeholder="Fecha de Fin" required>
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: async () => {
          const nombre = DOMPurify.sanitize(Swal.getPopup().querySelector('#nombre').value);
          const descripcion = DOMPurify.sanitize(Swal.getPopup().querySelector('#descripcion').value);
          const startDate = DOMPurify.sanitize(Swal.getPopup().querySelector('#startDate').value);
          const endDate = DOMPurify.sanitize(Swal.getPopup().querySelector('#endDate').value);
  
  
           if (!nombre.trim() || !descripcion.trim() || !startDate || !endDate) {
            Swal.showValidationMessage('Todos los campos son obligatorios');
          } else if (startDate > endDate) {
            Swal.showValidationMessage('La fecha de inicio no puede ser posterior a la fecha de fin');
          } else {
            try {
              await sgpApi.post('/projects', {
                name: nombre,
                description: descripcion,
                startDate: startDate,
                endDate: endDate,
              });
  
              return { nombre, descripcion, startDate, endDate };
            } catch (error) {
              console.error('Error al agregar el proyecto:', error);
              Swal.fire('Error', 'Hubo un problema al agregar el proyecto.', 'error');
            }
          }
        },
      });
  
      if (result.isConfirmed) {
        RecargarDatos();
        Swal.fire('Agregado', 'El proyecto ha sido agregado correctamente.', 'success');
      }
    } catch (error) {
      console.error('Error al abrir el modal de agregar:', error);
    }
  };
  



  const filteredProyecto = searchActive
    ? proyectos.filter((item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : proyectos;

  return (
    <div className={styles['main-container']}>
      <h1>Proyectos</h1>
      <div className={styles.toolbar}>
      <div className={styles.box}>
          <form name="search" onSubmit={handleSearchFormSubmit}>
            <input
              type="text"
              className={styles.input}
              value={searchTerm}
              onChange={handleSearchInputChange}
              placeholder="Buscar por nombre"
            />
            <IconButton color="primary" onClick={handleSearchButtonClick}>
              <SearchIcon />
            </IconButton>
          </form>

        </div>
        <div className={styles.addButtonContainer}>
          <button className={styles.iconButton}>
            <Add style={{ color: '#2196f3' }} onClick={HandleAdd}/>
          </button>
        </div>
      </div>
      <div className={styles.scrollableTableContainer}>
      <table className={`${styles.table} ${styles.roundedTable}`}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Fecha de Inicio</th>
            <th>Fecha de Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filteredProyecto.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? styles.even : ''}>
              <td>{item.nombre}</td>
              <td>{item.descripcion}</td>
              <td>{item.Fecha_Inicio}</td>
              <td>{item.Fecha_Fin}</td>
              <td>
                <button className={styles.botoneseyb} onClick={() => HandleEdit(item)}>
                  <ModeEditIcon sx={{ color: '#fff' }} />
                </button>
                <button className={styles.botoneseyb} onClick={() => HandleRemove(item.id)}>
                  <ModeDeleteIcon style={{ color: '#fff' }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
