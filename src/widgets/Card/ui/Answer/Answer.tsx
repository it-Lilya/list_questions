import { useState } from 'react';
import parse from 'html-react-parser';

import styles from './Answer.module.scss';

interface AnswerProps {
  title: string;
  children?: string;
  props?: React.ReactNode;
}

const Answer: React.FC<AnswerProps> = ({ title, children, props }) => {
  const [open, setOpen] = useState(false);
  const [textBtn, setTextBtn] = useState('Развернуть');

  return (
    <div className={styles.container}>
      <h4 className={styles.header}>{title}</h4>
      {children && (
        <>
          <div
            className={`${title === 'Развёрнутый ответ' && styles.long} ${open && styles.expanded}`}
          >
            {parse(children)}
          </div>
          {title === 'Развёрнутый ответ' && (
            <button
              type='button'
              className={open ? styles.open : styles.close}
              onClick={() =>
                setOpen((prev) => {
                  setTextBtn((prevText) =>
                    prevText === 'Свернуть' ? 'Развернуть' : 'Свернуть',
                  );
                  return !prev;
                })
              }
            >
              {textBtn}
              <span></span>
            </button>
          )}
        </>
      )}
      {props && props}
    </div>
  );
};

export default Answer;
