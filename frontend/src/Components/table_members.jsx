import React from 'react';
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

function TablaMiembros({ rows }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="caption table">
                <TableHead sx={{ backgroundColor: '#a015e5' }}>
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
                            <TableCell component="th" scope="row" sx={{ backgroundColor: '#e1c5f0' }}>
                                {row.id}
                            </TableCell>
                            <TableCell sx={{ backgroundColor: '#e1c5f0' }} align="center">{row.name}</TableCell>
                            <TableCell sx={{ backgroundColor: '#e1c5f0' }} align="center"><img className={styles.iconpp} src={row.image || defaultImage} alt="Imagen" /></TableCell>
                            <TableCell sx={{ backgroundColor: '#e1c5f0' }} align="center">{row.team}</TableCell>
                            <TableCell sx={{ backgroundColor: '#e1c5f0' }} align="center">{row.speciality}</TableCell>
                            <TableCell sx={{ backgroundColor: '#e1c5f0' }} align="center">{row.job}</TableCell>
                            <TableCell sx={{ backgroundColor: '#e1c5f0' }} align="center">
                                <button className={styles.botoneseyb}><ModeEditIcon sx={{ color: '#fff' }} /></button>
                                <button className={styles.botoneseyb}><PersonRemoveIcon sx={{ color: '#fff' }} /></button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TablaMiembros;
