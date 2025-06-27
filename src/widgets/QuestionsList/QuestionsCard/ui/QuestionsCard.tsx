import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useGetQuestionQuery } from '../../../../shared/api/questionsApi';

import type { QuestionsResponseDTO } from '../types';

import Arrow from '../../../../shared/ui/Arrow/Arrow';
import LevelInfo from '../../../../shared/ui/LevelInfo/LevelInfo';

import styles from './QuestionsCard.module.scss';

interface QuestionsCardProps {
  question: QuestionsResponseDTO;
}

const QuestionsCard: React.FC<QuestionsCardProps> = ({ question }) => {
  const [open, setOpen] = useState(false);
  const id = question.id;
  const { data } = useGetQuestionQuery({ id });

  const navigate = useNavigate();

  const transitionCard = () => {
    navigate('/card', { state: data });
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.header_container}
        onClick={() => setOpen((prev) => !prev)}
      >
        <h2 className={styles.title}>{question.title}</h2>
        <button
          type='button'
          className={`${styles.toggle} ${open ? styles.open : ''}`}
        ></button>
      </div>

      {open && (
        <div className={styles.show_container}>
          <LevelInfo question={question} />
          <div className={styles.description_container}>
            {question.code && (
              <pre className={styles.code}>
                <code
                  dangerouslySetInnerHTML={{ __html: question.shortAnswer }}
                />
              </pre>
            )}
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: question.shortAnswer }}
            />
          </div>
          <Arrow
            className={styles.arrow}
            children='Подробнее'
            onClick={transitionCard}
          />
        </div>
      )}
    </div>
  );
};

export default QuestionsCard;
