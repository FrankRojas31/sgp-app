import { IoLogOutOutline } from "react-icons/io5";
import { GrProjects, GrResources } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import "./SideMenu.css";
import { SideMenuItem } from "./SideMenuItem";
import { SiTaichigraphics } from "react-icons/si";
import { RiTeamFill } from "react-icons/ri";
import styles from "./SideMenu.module.css";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { useAuthStore } from "../../stores/Auth/authStore";

const menuItems = [
  {
    title: "Dashboard",
    subTitle: "Información general",
    href: "/dashboard",
    Icon: SiTaichigraphics,
  },
  {
    title: "Proyectos",
    subTitle: "Gestionar proyectos",
    href: "/PageFirstProject",
    Icon: GrProjects,
  },
  {
    title: "Equipos",
    subTitle: "Gestionar equipos",
    href: "/teams",
    Icon: RiTeamFill,
  },
  {title: "Tu equipo",
  subTitle: "Gestionar equipos",
  href: "/teamread",
  Icon: RiTeamFill,
},
  {
    title: "Recursos",
    subTitle: "Gestionar recursos",
    href: "/HumanResources",
    Icon: GrResources,
  },
  {
    title: "Miembros",
    subTitle: "Gestionar miembros",
    href: "/members",
    Icon: FaPersonCirclePlus,
  },
];

export const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);
  const useUser = useAuthStore((state) => state.user);

  let filteredMenuItems = menuItems;

  if (useUser.roles.includes('member')) {
    filteredMenuItems = menuItems.filter(item => item.title === 'Dashboard' || item.title === 'Tu equipo');
  }
  
  if (useUser.roles.includes('admin')) {
    filteredMenuItems = menuItems;
  }

  if (useUser.roles.includes('admin')) {
    filteredMenuItems = menuItems;
  }

  return (
    <div id="menu" className={styles.menuContainer}>
      <div id="logo" className={styles.logoSection}>
        {/* Logo Image */}
        <img src="/public/logo.png" className={styles.logoSgp} alt="SGP Logo" />
        <h1 className={styles.logoTitle}>
          <span className={styles.logoSubtitle}>Gestor de Proyectos</span>
        </h1>
        {/* <p className={styles.logoDescription}>Gestor de proyectos</p>  */}
      </div>

      {/*  Profile */}
      <div id="profile" className={styles.profileSection}>
        <p className={styles.profileText}>Bienvenido,</p>
        <a href="#" className={styles.profileLink}>
          <span>
            <img className={styles.profileImage} src={useUser.picture} alt="" />
          </span>
          <span className={styles.profileName}>{useUser.fullName}</span>
        </a>
      </div>

      {/* Menu Items */}
      <nav id="nav" className={styles.navSection}>
        {filteredMenuItems.map((item) => (
          <SideMenuItem key={item.href} {...item} />
        ))}

        {/* Logout */}
        <div onClick={() => logout()}>
          <NavLink to={"/login"} className={styles.logoutLink}>
            <div>
              <IoLogOutOutline />
            </div>
            <div className={styles.buttom}>
              <span className={styles.logoutText}>Salir</span>
              <span className={styles.logoutSubText}>Cerrar sesión</span>
            </div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
