import { Outlet } from 'react-router-dom';
import MainSection from './MainSection';
import styles from './styles/MainSection.module.css';

const RootLayout = () => {
  return (
    <div className={styles.container}>
      <MainSection>
        <Outlet />
      </MainSection>
    </div>
  );
};

export default RootLayout;
