import { useState, useEffect } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModeDeleteIcon from '@mui/icons-material/Delete';
import styles from '../../css/Hresources.module.css';
import Swal from 'sweetalert2';
import { sgpApi } from '../../api/sgpApi';

export default function TableResource() {
  const [searchTerm, setSearchTerm] = useState('');
  const [human, setHuman] = useState([])


  const mostrarHumanResources = async () => {
    try {
      const respuesta = await sgpApi.get(`/resources/get-all-human-resources`);
      const arreglo = respuesta.data.map(human => ({
        id: human.id,
        description: human.description,
        specialty: human.specialty,
        is_available: human.is_available,
        hoursWorkDaily: human.hoursWorkDaily
      }));
      console.log(arreglo)
      setHuman(arreglo);
    } catch (error) {
      console.error('error al cargar los datos')
    }
  };
  useEffect(() => {
    mostrarHumanResources();
  }, []);

  const filteredDatos = human.filter(item =>
    item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Acciones 

  const HandleEdit = async (human) => {
    try {
      const result = await Swal.fire({
        title: 'Editar recurso',
        html: `
          <input id="description" class="swal2-input" placeholder="Equipo" value="${human.description}">
          <input id="speciality" class="swal2-input" placeholder="Especialidad" value="${human.speciality}">
          <input id="is_available" class="swal2-input" placeholder="Especialidad" value="${human.available}">
          <input id="hoursWorkDaily" class="swal2-input" placeholder="Cargo de Trabajo" value="${human.hours}">
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: async () => {
          const description = Swal.getPopup().querySelector('#description').value;
          const speciality = Swal.getPopup().querySelector('#speciality').value;
          const is_available = parseFloat(Swal.getPopup().querySelector('#is_available').value);
          const hoursWorkDaily = Swal.getPopup().querySelector('#hoursWorkDaily').value;

          try {
            await sgpApi.patch(`/resources/human-resource/${human.id}`, {
              description: description,
              speciality: speciality,
              is_available: is_available,
              hoursWorkDaily: hoursWorkDaily
            });

            return { description, speciality, is_available, hoursWorkDaily };
          } catch (error) {
            console.error('error al actualizar el recurso:', error);
            Swal.fire('Error', 'Hubo un problema al actualizar el recurso.', 'error');
          }
        },
      });

      if (result.isConfirmed) {
        mostrarHumanResources();
        Swal.fire('Actualizado', 'El miembro ha sido actualizado correctamente.', 'success');
      }
    } catch (error) {
      console.error('Error al abrir el modal de edición:', error);
    }
  };



  const HandleRemove = async (id) => {
    try{
     const result = Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
      });
      if((await result).isConfirmed){
        mostrarHumanResources();
        await sgpApi.delete(`/resources/human-resource/${id}`);
        Swal.fire('Desactivado', 'El recurso ha sido desactivado', 'success')
      }
    } catch (error){
      console.log('Error al eliminar recurso', error);
      Swal.fire('Error', 'hubo un problema al eliminar el recurso', 'error')
    }

  }
  useEffect(() => {
    mostrarHumanResources();
  }, []);
  const handleAgregarClick = async() => {
    try {
      const result = Swal.fire({
        title: 'Agregar Recurso Humano',
        html: `
        <input id="description" class="swal2-input" placeholder="description">
        
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
        <input id="hoursWorkDaily" class="swal2-input" placeholder="Horas Diarias Trabajadas">
        `,
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar',
        preConfirm: async () => {
          const description = Swal.getPopup().querySelector('#description').value;
          const speciality = Swal.getPopup().querySelector('#especialidad').value;
          const hoursWorkDaily = parseFloat(Swal.getPopup().querySelector('#hoursWorkDaily').value);
          try {
            const response = await sgpApi.post('/resources/create-human-resource', {
              
              description: description,
              specialty: speciality,
              hoursWorkDaily:hoursWorkDaily,
              userId: '',
            });

            return response.data;
          } catch (error) {
            console.error('Error al agregar el recurso:', error);
            Swal.fire('Error', 'Hubo un problema al agregar el recurso humano.', 'error');
          }

        }


      });
      if ((await result).isConfirmed) {

        mostrarHumanResources();
        Swal.fire('Agregado', 'El recurso humano ha sido agregado correctamente.', 'success');
      }
    } catch (error) {
      console.error('Error al abrir el modal de agregar:', error);
    }
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

            <th>Descripción</th>
            <th>Especialidad</th>
            <th>Disponible</th>
            <th>Horas diarias Trabajadas </th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filteredDatos.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? styles.even : ''}>
              <td>{item.description}</td>
              <td>
                <button className={styles.botonSpeciality} style={{ backgroundColor: getColorByRole(item.specialty) }}>
                  {item.specialty}
                </button>
              </td>
              <td>{item.is_available}</td>
              <td>{item.hoursWorkDaily}</td>
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
