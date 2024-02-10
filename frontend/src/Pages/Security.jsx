import React, { useEffect, useState } from "react";
import { Sidebar } from "../Components/dashboard/Sidebar";
import { sgpApi } from "../api/sgpApi";
import Swal from "sweetalert2";

const Security = () => {
  const [image, setImage] = useState(null);
  const [imageShow, setImageShow] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetch2fa = async () => {
      try {
        const response = await sgpApi.get("/auth/2fa/verify");
        // Aquí deberías verificar qué tipo de dato retorna la API y asegurarte de que sea un booleano
        setChecked(response.data); // Asegúrate de que response.data sea un booleano
      } catch (error) {
        console.error("Error fetching 2FA status:", error);
      }
    };
    fetch2fa();
  }, []);

  const deactivate2fa = async () => {
    try {
      await sgpApi.post("/auth/2fa/desactivate");
      setChecked(false); // Cambia el estado a false después de desactivar 2FA
      Swal.fire({
        title: "Desactivado",
        text: "La autenticación de dos factores ha sido desactivada",
        icon: "success",
        confirmButtonText: "Entendido",
      });
    } catch (error) {
      console.error("Error deactivating 2FA:", error);
    }
  };

  const generateUrl = async () => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Quieres activar la autenticación de dos factores?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, activarla",
      });

      if (result.isConfirmed) {
        const response = await sgpApi.post("/auth/2fa/generate");
        await sgpApi.post("/auth/2fa/activate");
        setImage(response.data);
        setImageShow(true);
        setChecked(true); // Cambia el estado a true después de activar 2FA
        Swal.fire({
          title: "Código QR",
          text: "Escanea el código QR con tu aplicación de autenticación",
          icon: "success",
          confirmButtonText: "Entendido",
        });
      } else {
        Swal.close();
      }
    } catch (error) {
      console.error("Error generating URL:", error);
    }
  };

  return (
    <>
      <Sidebar />
      {checked ? (
        <button onClick={deactivate2fa} style={buttonStyle}>
          Desactivar 2FA
        </button>
      ) : (
        <button onClick={generateUrl} style={buttonStyle}>
          Activar 2FA
        </button>
      )}

      {imageShow && (
        <img
          src={image}
          alt="2fa"
          style={{
            position: "absolute",
            top: "50%",
            left: "60%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </>
  );
};

const buttonStyle = {
  position: "absolute",
  background: "#191c40",
  color: "white",
  width: "200px",
  height: "50px",
  fontSize: "20px",
  borderRadius: "20px",
  fontWeight: "bold",
  top: "30%",
  left: "60%",
  transform: "translate(-50%, -50%)",
};

export default Security;
