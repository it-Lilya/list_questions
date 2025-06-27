import { useEffect, useState } from 'react';

import {
  useGetSpecializationsQuery,
  useGetSkillsQuery,
} from '../../../shared/api/questionsApi';

import CardFilters from '../../../shared/ui/CardFilters/ui/CardFilters';
import Error from '../../../shared/ui/Error/Error';
import Loader from '../../../shared/ui/Loader/Loader';
import Search from '../../../shared/ui/Search/Search';

import { rating, complexity } from '../mock/mock';

import styles from './QuestionsFilter.module.scss';

interface ParamsProp {
  page: number;
  skills: number[];
  rate: number[];
  keywords: string[];
  specialization: number | null;
  complexity: number[];
}

interface QuestionFilterProps {
  page: number;
  filterOpen: boolean;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setParams: React.Dispatch<React.SetStateAction<ParamsProp>>;
}

const QuestionFilter: React.FC<QuestionFilterProps> = ({
  page,
  filterOpen = false,
  setFilterOpen,
  setParams,
}) => {
  const {
    data: specializationsData,
    isLoading: isLoadingSpecializations,
    error: errorSpecializations,
  } = useGetSpecializationsQuery({ page });

  const {
    data: skillsData,
    isLoading: isLoadingSkills,
    error: errorSkills,
  } = useGetSkillsQuery({ page, id: 1 });

  const [param, setParam] = useState<ParamsProp>({
    page: page,
    skills: [],
    rate: [],
    keywords: [],
    specialization: null,
    complexity: [],
  });

  useEffect(() => {
    setParams(param);
  }, [param]);

  const updateSkills = (newSkills: number) => {
    setParams(prev => {
      const updatedSkills = prev.skills.includes(newSkills)
        ? prev.skills.filter(skill => skill !== newSkills) // Remove skill if it exists
        : [...prev.skills, newSkills]; // Add new skill
      return {
        ...prev,
        skills: updatedSkills
      };
    });
  };

  const updateSpecialization = (newSpecialization: number) => {
    setParam((prev) => ({
      ...prev,
      specialization:
        prev.specialization === newSpecialization ? null : newSpecialization,
    }));
  };

  const updateRate = (newRate: number) => {
    setParam((prev) => ({
      ...prev,
      rate: prev.rate.includes(+newRate)
        ? prev.rate.filter((r) => r !== +newRate)
        : [...prev.rate, +newRate],
    }));
  };

  const parseRange = (range: string) => {
    const [start, end] = range.split('-').map(Number);
    const result: number[] = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  };

  const updateComplexity = (newComplexity: string) => {
    const newComplexities = parseRange(newComplexity);
    setParam((prev) => {
      const currentComplexities = prev.complexity;
      const updatedComplexities = newComplexities.reduce(
        (acc, comp) => {
          if (acc.includes(comp)) {
            return acc.filter((item) => item !== comp);
          } else {
            return [...acc, comp];
          }
        },
        [...currentComplexities],
      );
      return {
        ...prev,
        complexity: updatedComplexities,
      };
    });
  };

  const handleSearch = (keywords: string[]) => {
    setParam((prev) => ({
      ...prev,
      keywords: keywords,
    }));
  };

  if (isLoadingSpecializations || isLoadingSkills) {
    return <Loader />;
  }
  if (errorSpecializations || errorSkills) {
    return <Error />;
  }

  return (
    <div
      className={`${styles.container} ${filterOpen ? styles.hidden_filter : ''}`}
    >
      <button
        className={styles.close}
        onClick={() => setFilterOpen((prev) => !prev)}
      ></button>
      <Search onSearch={handleSearch} />
      <CardFilters
        header='Специализация'
        link={true}
        data={specializationsData?.data}
        onChange={updateSpecialization}
      />
      <CardFilters
        header='Навыки'
        link={true}
        data={skillsData?.data}
        onChange={updateSkills}
      />
      <CardFilters
        header='Уровень сложности'
        data={complexity}
        onChange={updateComplexity}
      />
      <CardFilters header='Рейтинг' data={rating} onChange={updateRate} />
    </div>
  );
};

export default QuestionFilter;
