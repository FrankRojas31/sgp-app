import React, { useState } from 'react';
import styles from '../css/targetTeam.module.css';
import defaultImage from '../assets/ppDefault.jpeg';
import { Modal, Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function TargetTeam({ teams, onDeleteTeam, onRemoveMember }) {
  const [open, setOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState({});

  const handleOpen = (team) => {
    const updatedTeam = teams.find(t => t.id === team.id);
    setSelectedTeam(updatedTeam);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleRemoveMemberClick = async (teamId, memberId) => {
    await onRemoveMember(teamId, memberId);
    const updatedTeam = teams.find(t => t.id === teamId);
    setSelectedTeam(updatedTeam);
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
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveMemberClick(selectedTeam.id, member.id)}>
                  <DeleteIcon style={{ color: 'red' }} />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <button className={styles.agregarMiembroButton}>Agregar Miembro</button>
        </Box>
      </Modal>
    </div>
  );
}

export default TargetTeam;
