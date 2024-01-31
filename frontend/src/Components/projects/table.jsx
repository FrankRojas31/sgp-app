import{ useState } from 'react';
import { Delete, Edit, Search, Add } from '@mui/icons-material';
import styles from '../../css/table.module.css';

export default function TableProject() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const datos = [
    { id: 1, nombre: 'Juan God', descripcion: 'Agua', Fecha_Inicio: 'Enero', Recurso: '$450'},
    { id: 2, nombre: 'Irvin God', descripcion: 'Luz', Fecha_Inicio: 'Febrero', Recurso: '$450'},
    { id: 3, nombre: 'Josue God', descripcion: 'Coche', Fecha_Inicio: 'Marzo', Recurso: '$450'},
    { id: 4, nombre: 'Emma God', descripcion: 'Internet', Fecha_Inicio: 'Abril', Recurso: '$450'},
  ];

  const filteredDatos = datos.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles['main-container']}>
      <div className={styles.toolbar}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.iconButton}>
            <Search style={{ color: '#4caf50' }} />
          </button>
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
                <button className={styles.iconButton}>
                  <Delete style={{ color: '#f44336' }} />
                </button>
                <button className={styles.iconButton}>
                  <Edit style={{ color: '#ff9800' }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
