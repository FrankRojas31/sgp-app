import React from 'react';
import svg from "../assets/404.svg";
import styles from'../css/404.module.css';

function ErrorPage(){
return (
<>
<div className={styles.cont}></div>
<img src={svg} alt="svg" className={styles.foto} />
</>
);
};

export default ErrorPage;
