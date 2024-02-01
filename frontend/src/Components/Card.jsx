// CardListComponent.js

import React from 'react'; // Asegúrate de ajustar la ruta según tu estructura de archivos
import styles from '../css/Card.module.css';

const cardData = [
  {
    id: 1,
    title: 'Proyecto 1',
    subtitle: 'Actuales',
    name: 'MikeAndrewDesigner',
  },
  {
    id: 2,
    title: 'Proyecto 2',
    subtitle: 'Futuros',
    name: 'JohnDoeDesigner',
  },
  {
    id: 3,
    title: 'Proyecto 3',
    subtitle: 'Pasados',
    name: 'JaneDesigner',
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
