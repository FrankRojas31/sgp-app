import React from "react";
import styles from "./RecoveryButton.module.css";
import Swal from "sweetalert2";
import { sgpApi } from "../../api/sgpApi";

const RecoveryButton = ({ miembro }) => {
  const RecoveryPassword = async () => {
    const isPasswordSecure = (password) => {
      return (
        password.length >= 8 &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /\d/.test(password)
      );
    };
    try {
      const result = await Swal.fire({
        title: "Restablecer contraseña de " + miembro.fullName,
        html: `
              <input id="password" class="swal2-input" placeholder="Nueva contraseña">
              <input id="confirmPassword" class="swal2-input" placeholder="Confirmar contraseña">
                `,
        showCancelButton: true,
        confirmButtonText: "Restablecer",
        cancelButtonText: "Cancelar",
        preConfirm: async () => {
          const password = Swal.getPopup().querySelector("#password").value;
          const confirmPassword =
            Swal.getPopup().querySelector("#confirmPassword").value;

          try {
            if (password !== confirmPassword) {
              Swal.showValidationMessage("Las contraseñas no coinciden.");
            } else if (!password.trim() || !confirmPassword.trim()) {
              Swal.showValidationMessage(
                "Las contraseñas no pueden estar vacías."
              );
            } else if (
              !isPasswordSecure(password) ||
              !isPasswordSecure(confirmPassword)
            ) {
              Swal.showValidationMessage(
                "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número."
              );
            } else {
              const response = await sgpApi.patch(`/auth/update/${miembro.id}`, {
                password: confirmPassword,
              });
              console.log(response)
              return true;
            }
          } catch (error) {
            Swal.fire(
              "Error",
              "Hubo un problema al actualizar el miembro.",
              "error"
            );
          }
        },
      });

      if (result.isConfirmed) {
        Swal.fire(
          "Actualizado",
          "La contraseña ha sido restablecida.",
          "success"
        );
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <>
      <button
        className={styles.button}
        onClick={() => RecoveryPassword(miembro)}
      >
        Restablecer contraseña
      </button>
    </>
  );
};

export default RecoveryButton;
