import React, { useState,useEffect } from 'react';
import styles from '../css/targetTeam.module.css';
import { Sidebar } from '../Components/dashboard/Sidebar';
import TargetTeam from '../Components/targetTeam';
import { Modal, Box, Typography, TextField, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';


function TeamsPage() {
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState([]);
  const [teams, setTeams] = useState([]);

  
  const handleOpen = () => {
    fetchMembers();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleTeamNameChange = (event) => setTeamName(event.target.value);
  const handleMemberChange = (index) => {
    const newMembers = [...members];
    newMembers[index].checked = !newMembers[index].checked;
    setMembers(newMembers);
  };

  const updateSelectedTeam = (updatedTeam) => {
    // Esta función se pasará a TargetTeam para actualizar selectedTeam
  };
  


  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/auth/get-all-users');
      const fetchedMembers = response.data.map(user => ({
        id: user.id, // Asume que tienes un ID para cada usuario
        name: user.fullName,
        checked: false,
      }));
      setMembers(fetchedMembers);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };
  
  
  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/teams');
      const activeTeams = response.data.filter(team => team.isActive); // Filtrar solo equipos activos
      setTeams(activeTeams);
    } catch (error) {
      console.error('Error al obtener equipos:', error);
    }
  };
  
  useEffect(() => {
    fetchTeams();
  }, []);
  
  const createTeam = async () => {
    const selectedMemberIds = members
      .filter(member => member.checked)
      .map(member => member.id);
  
    const newTeam = {
      name: teamName,
      members: selectedMemberIds,
    };
  
    try {
      await axios.post('http://localhost:4000/api/teams', newTeam);
      fetchTeams(); // Recarga la lista de equipos
      handleClose(); // Cierra el modal
    } catch (error) {
      console.error('Error al crear el equipo:', error);
    }
  };
  
 

const handleDeleteTeam = async (teamId) => {
  try {
    await axios.delete(`http://localhost:4000/api/teams/${teamId}`);
    // Actualizar la lista de equipos después de la eliminación
    fetchTeams();
  } catch (error) {
    console.error('Error al eliminar el equipo:', error);
    // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
  }
};

const removeMemberFromTeam = async (teamId, memberId) => {
  try {
    const updatedMembers = teams.find(team => team.id === teamId).members.filter(member => member.id !== memberId);
    await axios.patch(`http://localhost:4000/api/teams/${teamId}`, { members: updatedMembers.map(member => member.id) });
    
    const updatedTeam = { ...teams.find(team => team.id === teamId), members: updatedMembers };

    // Actualizar el estado de los equipos con la nueva información
    setTeams(teams.map(team => team.id === teamId ? updatedTeam : team));

    // Actualizar el equipo seleccionado si es el mismo que el del modal
    if (selectedTeam && selectedTeam.id === teamId) {
      setSelectedTeam(updatedTeam);
    }
    
  } catch (error) {
    console.error('Error al eliminar miembro:', error);
  }
};




  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px', // Border radius para el modal
  };

  const checkboxListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px',
    marginBottom: '20px',
    overflowY: 'auto',
    maxHeight: '300px',
  };

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.mainContainer}>
        <h1>EQUIPOS</h1>
        <button className={styles.botonagregar} onClick={handleOpen}>Agregar</button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2">Añadir Equipo</Typography>
            <TextField 
              fullWidth 
              label="Nombre del Equipo" 
              value={teamName} 
              onChange={handleTeamNameChange} 
              margin="normal"
            />
            <Typography variant="subtitle1" sx={{ mt: 2 }}>Miembros</Typography>
            <Box sx={checkboxListStyle}>
  {members.map((member, index) => (
    <div key={index} className={styles.checkboxContainer}>
      <FormControlLabel
        control={
          <Checkbox checked={member.checked} onChange={() => handleMemberChange(index)} />
        }
        label={<span className={styles.checkboxLabel}>{member.name}</span>}
      />
    </div>
  ))}
</Box>

            <button className={styles.createTeamButton}  onClick={createTeam}>Crear Equipo</button>
          </Box>
        </Modal>
        <TargetTeam 
  teams={teams}
  onDeleteTeam={handleDeleteTeam}
  onRemoveMember={removeMemberFromTeam}
  onUpdateSelectedTeam={updateSelectedTeam} // Nueva prop
/>

      </div>
    </div>
  );
}

export default TeamsPage;
