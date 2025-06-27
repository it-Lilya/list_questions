import styles from './Error.module.scss';

const Error = () => {
  return (
    <div className={styles.error}>
      <h3>Ошибка загрузки данных</h3>
      <button className={styles.btn} onClick={() => window.location.reload()}>Попробовать еще раз</button>
    </div>
  )
}

export default Error;