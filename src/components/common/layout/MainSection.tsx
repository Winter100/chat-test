import styles from './styles/MainSection.module.css';
const MainSection = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

export default MainSection;
