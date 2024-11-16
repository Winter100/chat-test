import { Link, Outlet } from 'react-router-dom';
import MainSection from './MainSection';
import styles from './styles/MainSection.module.css';

const RootLayout = () => {
  return (
    <div className={styles.container}>
      <MainSection>
        <p>
          <Link to={'/login'}>로그인</Link>
        </p>
        <p>
          <Link to={'/chat'}>채팅방테스트</Link>
        </p>
        <Outlet />
      </MainSection>
    </div>
  );
};

export default RootLayout;
