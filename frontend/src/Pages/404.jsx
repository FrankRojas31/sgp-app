import React, { useEffect } from 'react';
import styles from '../css/404.module.css';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <>
    <div className={styles.body}>
      <div className={styles.text}>
        <div>ERROR</div>
        <h1>404</h1>
        <hr />
        <div>Page Not Found</div>
        <Link to='/dashboard'>
        <button className={styles.dash}>Volver al Dashboard</button>
        </Link>
      </div>
      </div>
    </>
  );
};

export default ErrorPage;
