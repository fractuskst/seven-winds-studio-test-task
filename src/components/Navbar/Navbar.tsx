import { PROJECT_NAMES } from '../../constants';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { ListItemButton, ListItemText } from '@mui/material';
import cn from 'classnames';
import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <div className={styles.container}>
      <ListItemButton className={styles.header}>
        <ListItemText
          primary="Название проекта"
          secondary="Аббревиатура"
          classes={{
            primary: styles.headerPrimaryText,
            secondary: styles.headerSecondaryText,
          }}
        />
        <KeyboardArrowDownIcon className={styles.headerIcon} />
      </ListItemButton>
      {PROJECT_NAMES.map((project) => (
        <ListItemButton
          key={project.id}
          className={cn(styles.listItemButton, project.name === 'СМР' && styles.activeListItemButton)}
        >
          <DashboardIcon className={styles.listItemIcon} />
          <ListItemText
            primary={project.name}
            classes={{
              primary: styles.listItemPrimaryText,
            }}
          />
        </ListItemButton>
      ))}
    </div>
  );
}
