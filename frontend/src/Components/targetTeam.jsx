import React, { useState } from 'react';
import styles from '../css/targetTeam.module.css';
import defaultImage from '../assets/ppDefault.jpeg';
import { Modal, Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, FormControl, InputLabel, Select, MenuItem, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

function TargetTeam({ teams, onDeleteTeam, onAddMember, members }) {
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState({});
  const [selectedMemberId, setSelectedMemberId] = useState('');

  const handleMemberSelectChange = (event) => {
    setSelectedMemberId(event.target.value);
  };

  // Función para manejar la adición de un miembro
  // Función para manejar la adición de un miembro
const handleAddMember = () => {
  // Cierra el modal primero
  handleClose();

  onAddMember(selectedTeam.id, selectedMemberId);
  setSelectedMemberId(''); // Resetear la selección

  // Mostrar la alerta de éxito
  Swal.fire({
    icon: 'success',
    title: 'Miembro Agregado',
    text: 'El miembro se ha agregado al equipo correctamente.',
    customClass: {
      popup: 'my-sweetalert', // Agrega una clase personalizada
    },
  });
};


  const handleOpen = (team) => {
    const updatedTeam = teams.find(t => t.id === team.id);
    setSelectedTeam(updatedTeam);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // En TargetTeam.js



  
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '8px',
    overflowY: 'auto',
    maxHeight: '90vh',
  };

  return (
    <div className={styles.tableContainer}>
      {teams.map((team, index) => (
        <div key={index} className={styles.teamContainer}>
          <table className={styles.myTable}>
            <tbody>
              <tr>
                <td className={styles.myTableCell}>{team.name}</td>
              </tr>
              <tr>
                <td className={styles.myTableCell}>MIEMBROS</td>
              </tr>
              {team.members.map((member, memberIndex) => (
                <tr key={memberIndex}>
                  <td className={styles.membersCol}>
                    <img className={styles.iconpp} src={defaultImage} alt={member.fullName} />
                    {member.fullName}
                  </td>
                </tr>
              ))}
            </tbody>
            <div className={styles.buttonContainer}>
              <button className={styles.verMiembrosButton} onClick={() => handleOpen(team)}>
                VER MIEMBROS
              </button>
              <IconButton aria-label="delete" className={styles.deleteButton} onClick={() => onDeleteTeam(team.id)}>
                <DeleteIcon style={{ color: 'red' }} />
              </IconButton>
            </div>
          </table>
        </div>
      ))}

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">Ver Usuarios</Typography>
          <List dense>
            {selectedTeam.members?.map((member, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar src={defaultImage} alt={member.fullName} />
                </ListItemAvatar>
                <ListItemText primary={member.fullName} />
                {/* 
                <IconButton edge="end" aria-label="delete">
                <DeleteIcon style={{ color: 'red' }} />
                </IconButton> 
              */}

              </ListItem>
            ))}
          </List>
          
        </Box>
      </Modal>
    </div>
  );
}

export default TargetTeam;
