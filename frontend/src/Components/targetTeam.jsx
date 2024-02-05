import React, { useState } from 'react';
import styles from '../css/targetTeam.module.css';
import defaultImage from '../assets/ppDefault.jpeg';
import { Modal, Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, FormControl, InputLabel, Select, MenuItem, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function TargetTeam({ teams, onDeleteTeam, onAddMember, members }) {
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState({});
  const [selectedMemberId, setSelectedMemberId] = useState('');

  const handleMemberSelectChange = (event) => {
    setSelectedMemberId(event.target.value);
  };

  // Función para manejar la adición de un miembro
  const handleAddMember = () => {
    onAddMember(selectedTeam.id, selectedMemberId);
    setSelectedMemberId(''); // Resetear la selección
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
          <Typography variant="h6" component="h2">Editar Equipo</Typography>
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
          <FormControl fullWidth margin="normal">
            <InputLabel id="member-select-label">Agregar Miembro</InputLabel>
            <Select
              labelId="member-select-label"
              value={selectedMemberId}
              label="Agregar Miembro"
              onChange={handleMemberSelectChange}
            >
              {members.map((member) => (
                <MenuItem key={member.id} value={member.id}>{member.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={handleAddMember} variant="contained" color="primary">
            Agregar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default TargetTeam;
