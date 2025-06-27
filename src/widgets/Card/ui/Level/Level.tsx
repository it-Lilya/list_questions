import type { QuestionsResponseDTO } from '../../../QuestionsList/QuestionsCard/types';

import Button from '../../../../shared/ui/Button/Button';

import styles from './Level.module.scss';

interface LevelProps {
  title: string;
  children?: (string | QuestionsResponseDTO)[];
  props?: React.ReactNode;
}

const Level: React.FC<LevelProps> = ({ title, children, props }) => {
  return (
    <div className={styles.container}>
      <h4>{title}</h4>
      {props}
      <ul className={styles.skills_container}>
        {children?.map((el, i) => {
          if (typeof el === 'string') {
            return <li key={i} className={styles.keywords}>{`#${el}`}</li>;
          } else {
            return (
              <li key={el.id} className={styles.btn}>
                <Button children={el.title} icon={el.imageSrc} />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Level;
