import Header from './components/Header';
import Navbar from './components/Navbar';
import styles from './App.module.scss';
import ProjectTitle from './components/ProjectTitle';
import ProjectTable from './components/Table';

export function App() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <Navbar />
        <div className={styles.table}>
          <ProjectTitle />
          <ProjectTable />
        </div>
      </div>
    </div>
  );
}
