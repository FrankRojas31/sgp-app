import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import styles from '../css/members.module.css';
import defaultImage from '../assets/ppDefault.jpeg';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect } from 'react';
const server = import.meta.env.VITE_BACKEND_URL

function TablaMiembros({ rows }) {

  useEffect(() => {
    const RecargarDatos = async () => {
      try {
        const respuesta = await axios.get(`${server}/auth/get-all-users`);
        console.log(respuesta.data);
      } catch (error) {
        console.error('Error al recargar datos:', error);
      }
    };

    RecargarDatos();
  }, []); 
    


  const handleBorrarClick = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        const nuevasFilas = rows.filter((fila) => fila.id !== id);
        setRows(nuevasFilas);

        Swal.fire('Borrado', 'El miembro ha sido eliminado correctamente', 'success');
      }
    });
  };
  const handleEditarClick = (id) => {
    const miembro = rows.find((fila) => fila.id === id);

    Swal.fire({
      title: 'Editar Miembro',
      html: `
            <input id="nombre" class="swal2-input" placeholder="Nombre" value="${miembro.name}">
            <input id="equipo" class="swal2-input" placeholder="Equipo" value="${miembro.team}">
            <select id="especialidad" class="swal2-select">
              <option value="Programador" ${miembro.speciality === 'Programador' ? 'selected' : ''}>Programador</option>
              <option value="Diseñador" ${miembro.speciality === 'Diseñador' ? 'selected' : ''}>Diseñador</option>
              <option value="Analista" ${miembro.speciality === 'Analista' ? 'selected' : ''}>Analista</option>
            </select>
            <input id="cargo" class="swal2-input" placeholder="Cargo de Trabajo" value="${miembro.job}">
          `,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const nombre = Swal.getPopup().querySelector('#nombre').value;
        const equipo = Swal.getPopup().querySelector('#equipo').value;
        const especialidad = Swal.getPopup().querySelector('#especialidad').value;
        const cargo = Swal.getPopup().querySelector('#cargo').value;

        const nuevasFilas = rows.map((fila) => (fila.id === id ? { ...fila, name: nombre, team: equipo, speciality: especialidad, job: cargo } : fila));
        setRows(nuevasFilas);

        return true;
      },
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="caption table">
        <TableHead sx={{ backgroundColor: '#191c40' }}>
          <TableRow>
            <TableCell sx={{ color: '#e3f2fd' }}>#</TableCell>
            <TableCell sx={{ color: '#e3f2fd' }} align="center">NOMBRE</TableCell>
            <TableCell sx={{ color: '#e3f2fd' }} align="center">FOTO DE PERFIL</TableCell>
            <TableCell sx={{ color: '#e3f2fd' }} align="center">EQUIPO</TableCell>
            <TableCell sx={{ color: '#e3f2fd' }} align="center">ESPECIALIDAD</TableCell>
            <TableCell sx={{ color: '#e3f2fd' }} align="center">CARGO DE TRABAJO</TableCell>
            <TableCell sx={{ color: '#e3f2fd' }} align="center">OPCIONES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row" sx={{ backgroundColor: '#b7bade' }}>
                {row.id}
              </TableCell>
              <TableCell sx={{ backgroundColor: '#b7bade' }} align="center">{row.name}</TableCell>
              <TableCell sx={{ backgroundColor: '#b7bade' }} align="center"><img className={styles.iconpp} src={row.image || defaultImage} alt="Imagen" /></TableCell>
              <TableCell sx={{ backgroundColor: '#b7bade' }} align="center">{row.team}</TableCell>
              <TableCell sx={{ backgroundColor: '#b7bade' }} align="center">
                <button className={styles.botonSpeciality} style={{ backgroundColor: getColorByRole(row.speciality) }}>
                  {row.speciality}
                </button>

              </TableCell>
              <TableCell sx={{ backgroundColor: '#b7bade' }} align="center">{row.job}</TableCell>
              <TableCell sx={{ backgroundColor: '#b7bade' }} align="center">
                <button className={styles.botoneseyb} onClick={handleEditarClick}><ModeEditIcon sx={{ color: '#fff' }} /></button>
                <button className={styles.botoneseyb} onClick={handleBorrarClick}><PersonRemoveIcon sx={{ color: '#fff' }} /></button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TablaMiembros;

const getColorByRole = (role) => {
  switch (role) {
    case 'Programador':
      return '#ff7360';
    case 'Diseñador':
      return '#8ae287';
    case 'Analista':
      return '#d06aff';
    case 'Administrador':
      return '#7052ff';
    case 'ProjectManajer':
      return '#84b6f4';
    default:
      return '#000000';
  }
};
