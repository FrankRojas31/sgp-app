import { useEffect, useState } from 'react';
import { Add } from '@mui/icons-material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModeDeleteIcon from '@mui/icons-material/Delete';
import ModeSearchIcon from '@mui/icons-material/Search';
import { Sidebar } from '../Components/dashboard/Sidebar';
import styles from '../css/table.module.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { sgpApi } from '../api/sgpApi';
import { useAuthStore } from '../stores/Auth/authStore';

export default function TableProject() {
  const [searchTerm, setSearchTerm] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const useUser = useAuthStore((state) => state.user);

  const RecargarDatos = async () => {
    try {
      const respuesta = await sgpApi.get(`/auth/get-all-users`);
      const arreglo = respuesta.data.map(user => ({
        id: user.id,
        nombre: user.fullName,
        roles: user.roles,
        Email: user.email,
        Activo: user.isActive
      }));
      setUsuarios(arreglo);
    } catch (error) {
      console.error('Error al recargar datos:', error);
    }
  };
  
  useEffect(() => {
    RecargarDatos();
  }, []);

  const filteredUsuarios = usuarios.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Acciones

  const HandleEdit = async (miembro) => {
    try {
      const result = await Swal.fire({
        title: 'Editar Miembro',
        html: `
          <input id="nombre" class="swal2-input" placeholder="Nombre" value="${miembro.nombre}">
          <input id="rol" class="swal2-input" placeholder="Rol" value="${miembro.roles}">
          <input id="email" class="swal2-input" placeholder="Email" value="${miembro.Email}">
          <input id="activo" class="swal2-input" placeholder="Activo" value="${miembro.Activo ? 'Sí' : 'No'}">
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: async () => {
          const nombre = Swal.getPopup().querySelector('#nombre').value;
          const rol = Swal.getPopup().querySelector('#rol').value;
          const email = Swal.getPopup().querySelector('#email').value;
          const activo = Swal.getPopup().querySelector('#activo').value === 'Sí';
  
          try {
            await sgpApi.patch(`/auth/update/${miembro.id}`, {
              fullName: nombre,
              roles: rol,
              email: email,
              isActive: activo,
            });
  
            return { nombre, rol, email, activo };
          } catch (error) {
            console.error('Error al actualizar el miembro:', error);
            Swal.fire('Error', 'Hubo un problema al actualizar el miembro.', 'error');
          }
        },
      });
  
      if (result.isConfirmed) {
        RecargarDatos();
        Swal.fire('Actualizado', 'El miembro ha sido actualizado correctamente.', 'success');
      }
    } catch (error) {
      console.error('Error al abrir el modal de edición:', error);
    }
  };
  
  
  

  const HandleRemove = async (id) => {
    if (useUser.id === id) {
      Swal.fire('Error', 'No puedes desactivarte a ti mismo.', 'error');
      return;
    }

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
        await sgpApi.patch(`/auth/update/${id}`, { isActive: false });
        Swal.fire('Desactivado', 'El miembro ha sido desactivado.', 'success');
        
      }
    } catch (error) {
      console.error('Error al desactivar el miembro:', error);
      Swal.fire('Error', 'Hubo un problema al desactivar el miembro.', 'error');
    }
  };
  
  

  return (
  <>
  <Sidebar/>
  
    <div className={styles['main-container']}>
      
      <h1>MIEMBROS</h1>
      <div className={styles.toolbar}>
      <div className={styles.box}>
          <form name="search">
          <input type="text" className={styles.input}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            <th>Nombre</th>
            <th>Rol</th>
            <th>Email</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
        {filteredUsuarios.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? styles.even : ''}>
              <td>{item.nombre}</td>
              <td>{item.roles}</td>
              <td>{item.Email}</td>
              <td>{item.Activo ? 'Sí' : 'No'}</td>
              <td>
              <button className={styles.botoneseyb} onClick={() => HandleEdit(item)}>
                      <ModeEditIcon sx={{ color: '#fff' }} />
                    </button>
                {useUser.id !== item.id && (
                  <>

                    <button className={styles.botoneseyb} onClick={() => HandleRemove(item.id)}>
                      <ModeDeleteIcon style={{ color: '#fff' }} />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}