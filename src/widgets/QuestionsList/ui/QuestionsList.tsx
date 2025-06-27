import { useState, useEffect } from 'react';

import { useGetQuestionsQuery } from '../../../shared/api/questionsApi';

import type { QuestionsResponseDTO } from '../QuestionsCard/types';

import Loader from '../../../shared/ui/Loader/Loader';
import Error from '../../../shared/ui/Error/Error';
import ContentTransition from '../../../shared/ui/ContentTransition/ContentTransition';
import Pagination from '../../../features/pagination/ui/Pagination';
import QuestionFilter from '../../../features/filter/ui/QuestionsFilter';

import QuestionsCard from '../QuestionsCard/ui/QuestionsCard';

import styles from './QuestionsList.module.scss';

interface ParamsProp {
  page: number;
  skills: number[];
  rate: number[];
  keywords: string[];
  specialization: number | null;
  complexity: number[];
}
const QuestionsList = () => {
  const [page, setPage] = useState(1);
  const [params, setParams] = useState<ParamsProp>({
    page: page,
    skills: [],
    rate: [],
    keywords: [],
    specialization: null,
    complexity: [],
  });
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const [filterOpen, setFilterOpen] = useState(false);
  const { data, error, isLoading } = useGetQuestionsQuery({
    page: params.page,
    skills: params.skills,
    rate: params.rate,
    keywords: params.keywords,
    specialization: params.specialization,
    complexity: params.complexity,
  });

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowSize(newWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      localStorage.clear();
    };
  }, []);

  useEffect(() => {
    const isMobileView = windowSize < 1440;

    if (isMobileView && !filterOpen) {
      setFilterOpen(true);
    }
    if (!isMobileView && filterOpen) {
      setFilterOpen(false);
    }
  }, [windowSize]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.quest_list}>
        <div className={styles.head_container}>
          <h3 className={styles.head}>Вопросы React, JavaScript</h3>
          <button
            type='button'
            className={styles.btn_frame}
            onClick={() => setFilterOpen((prev) => !prev)}
          ></button>
        </div>
        {data && (
          <ContentTransition keyProp={page}>
            <ul>
              {data?.data.map((question) => (
                <li key={question.id}>
                  <QuestionsCard question={question as QuestionsResponseDTO} />
                </li>
              ))}
            </ul>
            <Pagination page={page} setPage={setPage} totalPage={data?.total} />
          </ContentTransition>
        )}
      </div>
      <QuestionFilter
        page={page}
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        setParams={setParams}
      />
    </div>
  );
};

export default QuestionsList;
