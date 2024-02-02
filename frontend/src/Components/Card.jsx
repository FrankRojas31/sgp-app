// CardListComponent.js

import React from 'react'; // Asegúrate de ajustar la ruta según tu estructura de archivos
import styles from '../css/Card.module.css';

const datos = [1, 2, 3]
const cardData = [
  {
    id: 1,
    title: datos[0],
    subtitle: 'Proyectos',
  },
  {
    id: 2,
    title: datos[1],
    subtitle: 'Miembros',
  },
  {
    id: 3,
    title: datos[2],
    subtitle: 'Equipos',
  },
  {
    id: 4,
    title: datos[1],
    subtitle: 'Recursos',
  },
];

export default function CardListComponent() {
  return (
    <div className={styles.container}>
      {cardData.map((card) => (
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
