import styles from './HeaderCard.module.scss';
import { Logo } from '../../../../shared/assets';

interface HeaderCardProps {
  title: string;
  description: string;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderCard: React.FC<HeaderCardProps> = ({
  title,
  description,
  setClose,
}) => {
  return (
    <div className={styles.header_info}>
      <img src={Logo} className={styles.logo}></img>
      <div className={styles.contain}>
        <div className={styles.head_container}>
          <h3 className={styles.title}>{title}</h3>
          <button
            type='button'
            className={styles.btn_frame}
            onClick={() => setClose((prev) => !prev)}
          ></button>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default HeaderCard;
