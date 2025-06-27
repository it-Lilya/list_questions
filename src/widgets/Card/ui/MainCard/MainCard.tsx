import type { QuestionsResponseDTO } from '../../../QuestionsList/QuestionsCard/types';

import HeaderCard from '../HeaderCard/HeaderCard';
import Answer from '../Answer/Answer';

import styles from './MainCard.module.scss';

interface MainProps {
  data: QuestionsResponseDTO;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainCard: React.FC<MainProps> = ({ data, setClose }) => {
  return (
    <div className={styles.main}>
      <HeaderCard
        title={data.title}
        description={data.description}
        setClose={() => setClose((prev) => !prev)}
      />
      <Answer title='Краткий ответ' children={data.shortAnswer} />
      <Answer title='Развёрнутый ответ' children={data.longAnswer} />
    </div>
  );
};

export default MainCard;
