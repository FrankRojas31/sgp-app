import { NavLink } from 'react-router-dom';
import styles from './SideMenuItem.module.css'

export const SideMenuItem = ({ href, Icon, title, subTitle }) => {
  return (
    <NavLink
      key={ href }
      to={ href }
      end
    >
      <div>
        <Icon />
      </div>
      <div className={styles.container}>
        <span className={styles.title}>{ title }</span>
        <span className="text-sm text-white/50 hidden md:block">{ subTitle }</span>
      </div>
    </NavLink>
  );
}