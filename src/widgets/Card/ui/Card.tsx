import { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import type { QuestionsResponseDTO } from '../../QuestionsList/QuestionsCard/types';

import MainCard from './MainCard/MainCard';
import Level from './Level/Level';
import LevelInfo from '../../../shared/ui/LevelInfo/LevelInfo';
import styles from './Card.module.scss';

interface CardProps {
  question?: QuestionsResponseDTO[];
}

const Card: React.FC<CardProps> = () => {
  const [close, setClose] = useState(true);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    if (windowSize >= 1440) {
      setClose(false);
    } else {
      setClose(true);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const isMobileView = windowSize < 1440;

    if (isMobileView) {
      setClose(false);
    } else {
      setClose(true);
    }
  }, [windowSize]);

  const { state } = useLocation();
  const data = state;
  const navigate = useNavigate();

  const transitionPrev = () => {
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <button
        type='button'
        className={styles.btn_prev}
        onClick={transitionPrev}
      >
        <span className={styles.icon_prev}></span>
        Назад
      </button>

      <div className={styles.info_container}>
        <MainCard data={data} setClose={setClose} />
        <div
          className={`${styles.additionally} ${!close && windowSize < 1440 && styles.open}`}
        >
          <button
            className={`${styles.close_btn} ${!close ? styles.open : styles.hidden}`}
            onClick={() => setClose((prev) => !prev)}
          ></button>
          <Level title='Уровень:' props={<LevelInfo question={data} />} />
          <Level title='Навыки:' children={data.questionSkills} />
          <Level title='Ключевые слова:' children={data.keywords} />
          <div className={styles.author}>
            <p>
              Автор: <span>{data.createdBy?.username}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
