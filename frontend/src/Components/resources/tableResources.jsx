import { useState, useEffect } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModeDeleteIcon from '@mui/icons-material/Delete';
import styles from '../../css/Hresources.module.css';
import Swal from 'sweetalert2';
import { sgpApi } from '../../api/sgpApi';
import DOMPurify from 'dompurify';

export default function TableResource() {
  const [searchTerm, setSearchTerm] = useState('');
  const [human, setHuman] = useState([])





  const mostrarHumanResources = async () => {
    try {
      const respuesta = await sgpApi.get(`/resources/get-all-human-resources`);
      const arreglo = respuesta.data.map(human => {
        const userFullName = ( human.user.fullName) ;
  
        return {
          id: human.id,
          description: human.description,
          specialty: human.specialty,
          is_available: human.is_available,
          hoursWorkDaily: human.hoursWorkDaily,
          userId: userFullName
        };
      });
  
      setHuman(arreglo);
      console.log(arreglo);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
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
      const specialtiesResponse = await sgpApi.get('/resources/specialties');
      const validSpecialties = specialtiesResponse.data.validSpecialties;
  
      const usersResponse = await sgpApi.get('auth/get-all-users');
      const allUsers = usersResponse.data;
  
      const hoursOptions = Array.from({ length: 8 }, (_, i) => i + 1)
        .map(value => `<option value="${value}" ${value === human.hoursWorkDaily ? 'selected' : ''}>${value}</option>`)
        .join('');
  
      const result = await Swal.fire({
        title: 'Editar recurso',
        html: `
        <input id="description" class="swal2-input" placeholder="Equipo" value="${DOMPurify.sanitize(human.description)}">
        <select id="especialidad" class="swal2-select">
          ${Object.keys(validSpecialties).map(key => `<option value="${key}">${DOMPurify.sanitize(validSpecialties[key])}</option>`).join('')}
        </select>
        <select id="hoursWorkDaily" class="swal2-select">
          ${hoursOptions}
        </select>
        <select id="userId" class="swal2-select">
          ${allUsers.map(user => `<option value="${user.id}" ${user.id === human.userId ? 'selected' : ''}>${DOMPurify.sanitize(user.fullName)}</option>`).join('')}
        </select>
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: async () => {
          const description = Swal.getPopup().querySelector('#description').value;
          const speciality = Swal.getPopup().querySelector('#especialidad').value;
          const hoursWorkDaily = parseFloat(Swal.getPopup().querySelector('#hoursWorkDaily').value); // Convertir a número
  
          if (isNaN(hoursWorkDaily)) {
            throw new Error('Las horas diarias de trabajo deben ser un número válido.');
          }
  
          const userId = Swal.getPopup().querySelector('#userId').value;
  
          try {
            await sgpApi.patch(`/resources/human-resource/${human.id}`, {
              description: description,
              specialty: speciality,
              hoursWorkDaily: hoursWorkDaily,
              user: userId,
            });
  
            return { description, speciality, hoursWorkDaily };
          } catch (error) {
            console.error('Error al actualizar el recurso:', error);
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
  }
  






  const HandleRemove = async (id) => {
    try {
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
      if ((await result).isConfirmed) {
        mostrarHumanResources();
        await sgpApi.delete(`/resources/human-resource/${id}`);
        Swal.fire('Desactivado', 'El recurso ha sido desactivado', 'success')
      }
    } catch (error) {
      console.log('Error al eliminar recurso', error);
      Swal.fire('Error', 'hubo un problema al eliminar el recurso', 'error')
    }

  }
  useEffect(() => {
    mostrarHumanResources();
  }, []);



const handleAgregarClick = async () => {
  try {
    const specialtiesResponse = await sgpApi.get('/resources/specialties');
    const validSpecialties = specialtiesResponse.data.validSpecialties;
    const usersResponse = await sgpApi.get('auth/get-all-users');
    const allUsers = usersResponse.data;
    const specialtyOptions = Object.keys(validSpecialties).map(key => `<option value="${key}">${DOMPurify.sanitize(validSpecialties[key])}</option>`).join('');
    const userOptions = allUsers.map(user => `<option value="${user.id}">${DOMPurify.sanitize(user.fullName)}</option>`).join('');
    const hoursOptions = Array.from({ length: 8 }, (_, i) => i + 1)
      .map(value => `<option value="${value}">${value}</option>`)
      .join('');

    const result = await Swal.fire({
      title: 'Agregar Recurso Humano',
      html: `
        <input id="description" class="swal2-input" placeholder="Descripción">
        <select id="especialidad" class="swal2-select">
          ${specialtyOptions}
        </select>
        <select id="hoursWorkDaily" class="swal2-select">
          ${hoursOptions}
        </select>
        <select id="userId" class="swal2-select">
          ${userOptions}
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      preConfirm: async () => {
        const description = Swal.getPopup().querySelector('#description').value;
        const speciality = Swal.getPopup().querySelector('#especialidad').value;
        const hoursWorkDaily = parseFloat(Swal.getPopup().querySelector('#hoursWorkDaily').value);
        const userId = Swal.getPopup().querySelector('#userId').value;

        try {
          const response = await sgpApi.post('/resources/create-human-resource', {
            description: description,
            specialty: speciality,
            hoursWorkDaily: hoursWorkDaily,
            user: userId,
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
            <th>Encargado</th>
            <th>Horas diarias Trabajadas </th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
  {filteredDatos.map((item, index) => (
    <tr key={index} className={index % 2 === 0 ? styles.even : ''}>
      <td>{item.description}</td>
      <td>
        <button
          className={styles.botonSpeciality}
          style={{ backgroundColor: getColorByRole(item.specialty), color: 'white' }}
        >
          {item.specialty}
        </button>
      </td>
      <td>{item.userId}</td>


      <td>{item.hoursWorkDaily}h</td>
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

const getColorByRole = (role) => {
  switch (role) {
    case 'recruitment':
      return '#3498db'; // Blue
    case 'talentmanagement':
      return '#2ecc71'; // Emerald green
    case 'performancemanagement':
      return '#f39c12'; // Orange
    case 'trainingdevelopment':
      return '#9b59b6'; // Purple
    case 'organizationalculture':
      return '#27ae60'; // Dark emerald green
    case 'changemanagement':
      return '#e74c3c'; // Red
    case 'compensationbenefits':
      return '#f1c40f'; // Yellow
    case 'conflictmanagement':
      return '#e67e22'; // Dark orange
    case 'developer':
      return '#2980b9'; // Dark blue
    case 'designer':
      return '#e74c3c'; // Red
    case 'dataanalyst':
      return '#8e44ad'; // Dark purple
    case 'cybersecurity':
      return '#1abc9c'; // Green
    case 'systemsengineer':
      return '#34495e'; // Bluish gray
    case 'databaseadministrator':
      return '#2c3e50'; // Navy blue
    case 'softwareprojectmanager':
      return '#16a085'; // Dark green
    case 'softwarequality':
      return '#d35400'; // Dark orange
    case 'softwarearchitect':
      return '#3498db'; // Blue
    case 'uxspecialist':
      return '#9b59b6'; // Purple
    case 'uispecialist':
      return '#2ecc71'; // Emerald green
    case 'networkengineer':
      return '#f39c12'; // Orange
    case 'systemsintegration':
      return '#27ae60'; // Dark emerald green
    case 'ai_ml_specialist':
      return '#e74c3c'; // Red
    case 'mobiledeveloper':
      return '#f1c40f'; // Yellow
    case 'webdeveloper':
      return '#e67e22'; // Dark orange
    case 'devopsspecialist':
      return '#8e44ad'; // Dark purple
    case 'testingqa':
      return '#34495e'; // Bluish gray
    default:
      return '#000000'; // Black by default
  }
};

