import Dedicated from '../Dedicated/Dedicated';

import type { QuestionDTO } from '../../api/questionsDTO';

import styles from './LevelInfo.module.scss';

interface LevelInfoProps {
  question: QuestionDTO;
}

const LevelInfo: React.FC<LevelInfoProps> = ({ question }) => {
  return (
    <div className={styles.container_info}>
      <p className={styles.info}>
        Рейтинг: <Dedicated children={question.rate} classname={true} />
      </p>
      <p className={styles.info}>
        Сложность: <Dedicated children={question.complexity} classname={true} />
      </p>
    </div>
  );
};

export default LevelInfo;
