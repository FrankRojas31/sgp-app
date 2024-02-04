import { useEffect, useState } from 'react';
import { Add } from '@mui/icons-material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModeDeleteIcon from '@mui/icons-material/Delete';
import styles from '../../css/table.module.css';
import Swal from 'sweetalert2';
import { sgpApi } from '../../api/sgpApi';

export default function TableProject() {
  const [searchTerm, setSearchTerm] = useState('');
  const [proyectos, setProyectos] = useState([]);

  // Logica para traer datos de la api.

  const RecargarDatos = () => {
    try {
      const respuesta = sgpApi.get('/project');
      const datos = respuesta.data.map(project => ({
        id:project.id,
        nombre: project.name,
        descripcion: project.description,
        Fecha_Inicio: project.startDate,
        Fecha_Fin: project.endDate,
        Activo: project.isActive
      }));
      setProyectos(datos)
    } catch (error) {
      console.log(`Se detecto  un error al cargar los proyectos ${error}`);
    }
  }

  useEffect(() => {
    RecargarDatos();
  }, []);

  const filteredProyecto = proyectos.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles['main-container']}>
      <h1>Proyectos</h1>
      <div className={styles.toolbar}>
      <div className={styles.box}>
          <form name="search">
            <input type="text" className={styles.input}
              value={searchTerm}
              onChange={""}
              placeholder='Buscar por nombre' />
          </form>

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
          {filteredProyecto.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? styles.even : ''}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.descripcion}</td>
              <td>{item.Fecha_Inicio}</td>
              <td>{item.Fecha_Fin}</td>
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
