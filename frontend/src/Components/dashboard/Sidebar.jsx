import { IoLogOutOutline } from 'react-icons/io5';
import { GrProjects, GrResources } from "react-icons/gr";
import { NavLink } from 'react-router-dom';
import './SideMenu.css';
import { SideMenuItem } from './SideMenuItem';
import { SiTaichigraphics } from "react-icons/si";
import { RiTeamFill } from "react-icons/ri";
import styles from './SideMenu.module.css'
import { FaPersonCirclePlus } from "react-icons/fa6";

const menuItems = [
  { title: 'Dashboard', subTitle: 'Información general', href: '/dashboard', Icon: SiTaichigraphics },
  { title: 'Proyectos', subTitle: 'Gestionar proyectos', href: '/projects', Icon: GrProjects },
  { title: 'Equipos', subTitle: 'Gestionar equipos', href: '/teams', Icon: RiTeamFill },
  { title: 'Recursos', subTitle: 'Gestionar recursos', href: '/resources', Icon: GrResources },
  { title: 'Miembros', subTitle: 'Gestionar miembros', href: '/members', Icon: FaPersonCirclePlus },
];


export const Sidebar = () => {

  return (
    <div id="menu" className={styles.menuContainer}>
       <div id="logo" className={styles.logoSection}>
        {/* Logo Image */}
        <img src='/public/logo.png' className={styles.logoSgp} alt="SGP Logo"/>
        <h1 className={styles.logoTitle}>
          <span className={styles.logoSubtitle}>Gestor de Proyectos</span>
        </h1>
         {/* <p className={styles.logoDescription}>Gestor de proyectos</p>  */}
      </div>

      {/*  Profile */ }
      <div id="profile" className={styles.profileSection}>
        <p className={styles.profileText}>Bienvenido,</p>
        <a href="#" className={styles.profileLink}>
          <span>
            <img className={styles.profileImage} src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80" alt="" />
          </span>
          <span className={styles.profileName}>
            Juan Diego Mendoza
          </span>
        </a>
      </div>

      {/* Menu Items */ }
      <nav id="nav" className={styles.navSection}>
        {
          menuItems.map( item =>(
            <SideMenuItem key={item.href} {...item} />
          ) )
        }

        {/* Logout */}
        <NavLink to={'/auth/login'} className={styles.logoutLink}>
          <div>
            <IoLogOutOutline />
          </div>
          <div className={styles.buttom}>
            <span className={styles.logoutText}>Salir</span>
            <span className={styles.logoutSubText}>Cerrar sesión</span>
          </div>
        </NavLink>

      </nav>
    </div>
  );
};