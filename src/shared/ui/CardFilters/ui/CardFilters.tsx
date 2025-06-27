import { useState } from 'react';

import Button from '../../Button/Button';

import styles from './CardFilters.module.scss';

import type { DataItem } from '../../../api/questionsDTO';

type OnChangeType = ((value: string) => void) | ((value: number) => void);

interface CardFiltersProps {
  header: string;
  link?: boolean;
  data?: DataItem[];
  onChange: OnChangeType;
}

const CardFilters: React.FC<CardFiltersProps> = ({
  header = '',
  link = false,
  data,
  onChange,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [text, setText] = useState('Посмотреть все');

  function opens() {
    setExpanded((prev) => {
      const newState = !prev;
      setText(newState ? 'Скрыть' : 'Посмотреть все');
      return newState;
    });
  }

  function handle(el: DataItem) {
    if (header === 'Специализация' || header === 'Навыки') {
      onChange(el.id as never);
    } else {
      onChange(el.title as never);
    }
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>{header}</h3>
      <ul className={`${styles.btn_container} ${expanded ? styles.open : ''}`}>
        {data?.map((el) => (
          <li key={el.id}>
            <Button
              children={el.title}
              icon={el.imageSrc}
              onClick={() => handle(el)}
            />
          </li>
        ))}
      </ul>
      {link && (
        <button className={styles.open_btn} type='button' onClick={opens}>
          {text}
        </button>
      )}
    </div>
  );
};

export default CardFilters;
