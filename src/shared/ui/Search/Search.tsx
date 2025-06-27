import { useState } from 'react';

import { iconSearch } from '../../assets/index';
import styles from './Search.module.scss';

interface SearchProps {
  onSearch: (keywords: string[]) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    const keywords = searchValue
      .split(',')
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);
    onSearch(keywords);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.search_input}>
        <button type='button' className={styles.search_btn}>
          <img src={iconSearch} className={styles.icon}></img>
        </button>
        <input
          className={styles.search}
          type='text'
          placeholder='Введите запрос...'
          id='search'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
      </div>
    </div>
  );
};

export default Search;
