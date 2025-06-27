import { useState } from 'react';
import type {
  FC,
  ReactNode,
  MouseEventHandler,
  ButtonHTMLAttributes,
} from 'react';

import classNames from 'classnames';

import { iconFigma, iconHtml } from '../../assets';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children?: ReactNode;
  type?: 'reset' | 'submit' | 'button';
  icon?: string;
}

const Button: FC<ButtonProps> = ({
  onClick = () => {},
  className = '',
  children,
  type = 'button',
  icon,
  ...restProps
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsActive((prev) => !prev);
    onClick(event);
  };

  return (
    <button
      className={classNames(styles.Button, className, {
        [styles.active]: isActive,
      })}
      onClick={handleClick}
      type={type}
      {...restProps}
    >
      {icon && typeof icon === 'string' && (
        <span className={styles.icon}>
          <img
            src={icon}
            alt={`${children}`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = Math.random() < 0.5 ? iconHtml : iconFigma;
            }}
          />
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
