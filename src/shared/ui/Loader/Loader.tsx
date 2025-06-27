import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
        <div className={styles.loader}>
          <div className={styles.loaderDot}></div>
          <div className={styles.loaderDot}></div>
          <div className={styles.loaderDot}></div>
        </div>
    </div>
  )
}

export default Loader;