import React, { useEffect, useState } from "react";
import styles from "../css/404.module.css";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/Auth/authStore";
const ErrorPage = () => {
  const useUser = useAuthStore((state) => state.user);

  return (
    <>
      <div className={styles.body}>
        <div className={styles.text}>
          <div>ERROR</div>
          <h1>404</h1>
          <hr />
          <div>Page Not Found</div>
          <Link
            to={useUser.roles.includes("member") ? "/teamread" : "/dashboard"}
          >
            <button className={styles.dash}>Volver</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
