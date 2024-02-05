// CardListComponent.js

import React, { useEffect, useState } from 'react';
import styles from '../css/Card.module.css';
import { sgpApi } from '../api/sgpApi';

const datos = ["DEFAULT"];

const cardData = [
  {
    id: 1,
    title: datos[0],
    subtitle: 'Proyectos',
  },
  {
    id: 2,
    title: datos[0],
    subtitle: 'Administradores',
  },
  {
    id: 3,
    title: datos[0],
    subtitle: 'Equipos',
  },
  {
    id: 4,
    title: datos[0],
    subtitle: 'Recursos',
  },
  {
    id: 5,
    title: datos[0],
    subtitle: 'Usuarios',
  },
  {
    id: 6,
    title: datos[0],
    subtitle: 'Servicios',
  },
];

export default function CardListComponent() {
  const [usuarios, setUsuarios] = useState([]);
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    RecargarDatosUsuarios();
    RecargarDatosProyectos();
  }, []);

  const RecargarDatosUsuarios = async () => {
    try {
      const respuesta = await sgpApi.get(`/auth/get-all-users`);
      const arreglo = respuesta.data.map((user) => ({
        id: user.id,
        nombre: user.fullName,
        roles: user.roles,
        Email: user.email,
        Activo: user.isActive,
      }));
      setUsuarios(arreglo);
    } catch (error) {
      console.error('Error al recargar datos de usuarios:', error);
    }
  };

  const RecargarDatosProyectos = async () => {
    try {
      const respuesta = await sgpApi.get('/projects');
      const datos = respuesta.data
        .filter((project) => project.isActive === true)
        .map((project) => ({
          id: project.id,
          nombre: project.name,
          descripcion: project.description,
          Fecha_Inicio: project.startDate,
          Fecha_Fin: project.endDate,
          Activo: project.isActive,
        }));

      setProyectos(datos);
    } catch (error) {
      console.error(`Se detectó un error al cargar los proyectos: ${error}`);
    }
  };

  const numProyectosActivos = proyectos.filter((project) => project.Activo === true).length;

  const numAdministradores = usuarios.filter((user) => user.roles.includes('admin')).length;

  const updatedCardData = cardData.map((card) => {
    switch (card.subtitle) {
      case 'Proyectos':
        return {
          ...card,
          title: numProyectosActivos,
        };
      case 'Administradores':
        return {
          ...card,
          title: numAdministradores,
        };
      default:
        return card;
    }
  });

  console.log(updatedCardData);

  return (
    <div className={styles.container}>
      {updatedCardData.map((card) => (
        <div key={card.id} className={`${styles['e-card']} ${styles.playing}`}>
          <div className={styles.image}></div>

          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>

          <div className={styles.infotop}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={styles.icon}>
              {/* SVG Path */}
            </svg>
            <br />
            {card.title}
            <br />
            <div className={styles.name}>{card.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
