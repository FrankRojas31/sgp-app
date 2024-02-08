import React, { useState, useEffect } from 'react';
import styles from '../css/targetTeam.module.css';
import { Sidebar } from '../Components/dashboard/Sidebar.jsx';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { sgpApi } from '../api/sgpApi.jsx';
import styless from '../css/tarjet.module.css';
import defaultImage from '../assets/ppDefault.jpeg';

function TeamsRead() {
    const [open, setOpen] = useState(false);
    const [teamName, setTeamName] = useState('');
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetchUserAndTeams();
    }, []);

    const fetchUserAndTeams = async () => {
        try {
            const authData = JSON.parse(localStorage.getItem('auth-storage'));
            if (authData && authData.state && authData.state.status === 'authorized') {
                const userData = authData.state.user;
                fetchTeams(userData.token);
            }
        } catch (error) {
            console.error('Error al obtener el usuario y los equipos:', error);
        }
    };

    const fetchTeams = async (token) => {
        try {
            const response = await sgpApi.get('/teams/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data) {
                const teamsData = Array.isArray(response.data) ? response.data : [response.data];
                const userTeam = teamsData.find(team => team.members.some(member => member.token === token));
                if (userTeam) {
                    setTeams([userTeam]);
                }
            }
        } catch (error) {
            console.error('Error al obtener equipos del usuario:', error);
        }
    };


    return (
        <div className={styles.pageContainer}>
            <Sidebar />
            <div className={styles.mainContainer}>
                <h1>TU EQUIPO</h1>
                <Modal open={open}>
                    <Box>
                        <Typography variant="h6" component="h2">Añadir Equipo</Typography>
                        <TextField fullWidth label="Nombre del Equipo" value={teamName} onChange={(e) => setTeamName(e.target.value)} margin="normal" />
                        <Typography variant="subtitle1" sx={{ mt: 2 }}>Miembros</Typography>

                        <Button className={styles.createTeamButton} variant="contained" color="primary">
                            Crear Equipo
                        </Button>
                    </Box>
                </Modal>
                <div className={styless.tableContainer}>
                    {teams.map((teamData, index) => (
                        <div key={index} className={styless.teamContainer}>
                            <table className={styless.myTable}>
                                <tbody>
                                    <tr>
                                        <td className={styless.myTableCell}>{teamData.name}</td>
                                    </tr>
                                    <tr>
                                        <td className={styless.myTableCell}>MIEMBROS</td>
                                    </tr>
                                    {teamData.members.map((member, memberIndex) => (
                                        <tr key={memberIndex}>
                                            <td className={styless.membersCol}>
                                                <img className={styles.iconpp} src={defaultImage} alt={member.fullName} />
                                                {member.fullName}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TeamsRead;
