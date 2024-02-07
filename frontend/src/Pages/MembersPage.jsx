import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ModeDeleteIcon from "@mui/icons-material/Delete";
import { Sidebar } from "../Components/dashboard/Sidebar";
import styles from "../css/table.module.css";
import Swal from "sweetalert2";
import { sgpApi } from "../api/sgpApi";
import { useAuthStore } from "../stores/Auth/authStore";
import DOMPurify from "dompurify";
import RecoveryButton from "../Components/actions/RecoveryButton";

export default function TableProject() {
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const useUser = useAuthStore((state) => state.user);

  const RecargarDatos = async () => {
    try {
      const respuesta = await sgpApi.get(`/auth/get-all-users`);
      setUsuarios(respuesta.data);
    } catch (error) {
      console.error("Error al recargar datos:", error);
    }
  };

  useEffect(() => {
    RecargarDatos();
  }, [usuarios]);

  const filteredUsuarios = usuarios.filter((item) =>
    item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Acciones

  const HandleAdd = async () => {
    try {
      const roles = [
        { value: "member", text: "Miembro" },
        { value: "admin", text: "Administrador" },
      ];

      const result = await Swal.fire({
        title: "Añadir Miembro",
        html: `
          <input id="nombre" class="swal2-input" placeholder="Nombre" required>
          <select id="rol" class="swal2-select" required>
            ${roles
              .map(
                (role) => `<option value="${role.value}">${role.text}</option>`
              )
              .join("")}
          </select>
          <input id="email" class="swal2-input" type="email" placeholder="Email" required>
          <input id="contraseña" class="swal2-input" placeholder="Contraseña" required>
          <p id="passwordHint" style="color: red;"></p>
        `,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        preConfirm: async () => {
          const nombre = DOMPurify.sanitize(
            Swal.getPopup().querySelector("#nombre").value
          );
          const rol = DOMPurify.sanitize(
            Swal.getPopup().querySelector("#rol").value
          );
          const email = DOMPurify.sanitize(
            Swal.getPopup().querySelector("#email").value
          );
          const contraseña = DOMPurify.sanitize(
            Swal.getPopup().querySelector("#contraseña").value
          );

          const isPasswordSecure = (password) => {
            return (
              password.length >= 8 &&
              /[a-z]/.test(password) &&
              /[A-Z]/.test(password) &&
              /\d/.test(password)
            );
          };

          if (!nombre.trim() || !rol.trim() || !email || !contraseña) {
            Swal.showValidationMessage("Todos los campos son obligatorios");
          } else if (!isPasswordSecure(contraseña)) {
            Swal.showValidationMessage(
              "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números."
            );
          } else if (
            usuarios.some(
              (member) => member.email.toLowerCase() === email.toLowerCase()
            )
          ) {
            Swal.showValidationMessage("El correo ya ha sido registrado");
          } else {
            try {
              await sgpApi.post(`/auth/register`, {
                fullName: nombre,
                roles: rol,
                email: email,
                password: contraseña,
              });

              return { nombre, rol, email, contraseña };
            } catch (error) {
              console.error("Error al crear el miembro:", error);
              Swal.fire(
                "Error",
                "Hubo un problema al crear el miembro.",
                "error"
              );
            }
          }
        },
      });

      if (result.isConfirmed) {
        RecargarDatos();
        Swal.fire(
          "Creado",
          "El miembro ha sido creado correctamente.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error al abrir el modal de creacion:", error);
    }
  };

  const HandleEdit = async (miembro) => {
    try {
      const roles = [
        { value: "member", text: "Miembro" },
        { value: "admin", text: "Administrador" },
      ];

      const result = await Swal.fire({
        title: "Editar Miembro",
        html: `
          <input id="nombre" class="swal2-input" placeholder="Nombre" value="${
            miembro.fullName
          }">
           <select id="rol" class="swal2-select" required>
            ${roles
              .map(
                (role) => `<option value="${role.value}">${role.text}</option>`
              )
              .join("")}
          <input id="email" class="swal2-input" placeholder="Email" value="${
            miembro.email
          }">
          <input id="activo" class="swal2-input" placeholder="Activo" value="${
            miembro.isActive ? "Sí" : "No"
          }">
        `,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        preConfirm: async () => {
          const nombre = Swal.getPopup().querySelector("#nombre").value;
          const rol = Swal.getPopup().querySelector("#rol").value;
          const email = Swal.getPopup().querySelector("#email").value;
          const activo =
            Swal.getPopup().querySelector("#activo").value === "Sí";

          if (
            usuarios.some(
              (member) => member.email.toLowerCase() === email.toLowerCase()
            )
          ) {
            Swal.showValidationMessage("El correo ya ha sido registrado");
          } else {
            try {
              await sgpApi.patch(`/auth/update/${miembro.id}`, {
                fullName: nombre,
                roles: rol,
                email: email,
                isActive: activo,
              });

              return { nombre, rol, email, activo };
            } catch (error) {
              console.error("Error al actualizar el miembro:", error);
              Swal.fire(
                "Error",
                "Hubo un problema al actualizar el miembro.",
                "error"
              );
            }
          }
        },
      });

      if (result.isConfirmed) {
        RecargarDatos();
        Swal.fire(
          "Actualizado",
          "El miembro ha sido actualizado correctamente.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error al abrir el modal de edición:", error);
    }
  };

  const HandleRemove = async (id) => {
    if (useUser.id === id) {
      Swal.fire("Error", "No puedes desactivarte a ti mismo.", "error");
      return;
    }

    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, desactivar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        RecargarDatos();
        await sgpApi.patch(`/auth/update/${id}`, { isActive: false });
        Swal.fire("Desactivado", "El miembro ha sido desactivado.", "success");
      }
    } catch (error) {
      console.error("Error al desactivar el miembro:", error);
      Swal.fire("Error", "Hubo un problema al desactivar el miembro.", "error");
    }
  };

  return (
    <>
      <Sidebar />

      <div className={styles["main-container"]}>
        <h1>MIEMBROS</h1>
        <div className={styles.toolbar}>
          <div className={styles.box}>
            <form name="search">
              <input
                type="text"
                className={styles.input}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nombre"
              />
            </form>
          </div>
          <div className={styles.addButtonContainer}>
            <button className={styles.iconButton}>
              <Add style={{ color: "#2196f3" }} onClick={HandleAdd} />
            </button>
          </div>
        </div>

        <div className={styles.scrollableTableContainer}>
          <table className={`${styles.table} ${styles.roundedTable}`}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Email</th>
                <th>Activo</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsuarios.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? styles.even : ""}>
                  <td>{item.fullName}</td>
                  <td>{item.roles}</td>
                  <td>{item.email}</td>
                  <td>{item.isActive ? "Sí" : "No"}</td>
                  <td>
                    {useUser.id !== item.id && (
                      <>
                        {useUser.permissions.includes("reset_password") ? (
                          <RecoveryButton miembro={item} />
                        ) : null}

                        <button
                          className={styles.botoneseyb}
                          onClick={() => HandleEdit(item)}
                        >
                          <ModeEditIcon sx={{ color: "#fff" }} />
                        </button>
                        <button
                          className={styles.botoneseyb}
                          onClick={() => HandleRemove(item.id)}
                        >
                          <ModeDeleteIcon style={{ color: "#fff" }} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
