import styles from './Header.module.scss';
import Apps from '@mui/icons-material/Apps';
import Reply from '@mui/icons-material/Reply';

export default function Header() {
  return (
    <div className={styles.container}>
      <Apps />
      <Reply />
      <div className={styles.activePage}>Просмотр</div>
      <div>Управление</div>
    </div>
  );
}
