// src/components/SearchButton/SearchButton.tsx
import React, { useState, useRef, useEffect } from "react";
import { LookUp } from "../../Icons/LookUp";
import styles from "./SearchButton.module.css";

interface SearchButtonProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  initialSize?: string; // Пропс для начального размера круглой кнопки
  onToggleExpand?: (isExpanded: boolean) => void; // Новый пропс для связи с родителем
}

function SearchButton(props: Readonly<SearchButtonProps>) {
  const { onSearch, placeholder = 'Search...', initialSize = '60px', onToggleExpand } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
    // Уведомляем родительский компонент об изменении состояния
    if (onToggleExpand) {
      onToggleExpand(isExpanded);
    }
  }, [isExpanded, onToggleExpand]); // onToggleExpand добавлен в зависимости

  const handleToggleExpand = () => {
    setIsExpanded(prevExpanded => !prevExpanded); // Используем функциональное обновление
    setSearchQuery('');
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
      // Опционально: можно схлопнуть поле ввода после поиска
      // setIsExpanded(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setIsExpanded(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isExpanded &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const containerInlineStyles: React.CSSProperties = {
    width: isExpanded ? undefined : initialSize, // При развороте ширина определяется CSS, иначе - initialSize
    height: initialSize, // Высота всегда фиксирована initialSize (для круглой кнопки и высоты инпута)
  };

  return (
    <div
      className={`${styles.container} ${isExpanded ? styles.expanded : ''}`}
      style={containerInlineStyles}
      ref={containerRef}
      tabIndex={isExpanded ? -1 : 0} /* Делаем контейнер фокусируемым для focus-visible, но отключаем при expanded */
    >
      {isExpanded ? (
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <input
            type="text"
            ref={inputRef}
            className={styles.searchInput}
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button title="Search" type="submit" className={styles.submitButton}>
            <LookUp className={styles.iconInInput} />
          </button>
        </form>
      ) : (
        <button
          className={styles.searchButton}
          onClick={handleToggleExpand}
        >
          <LookUp className={styles.icon} />
        </button>
      )}
    </div>
  );
}

export default SearchButton;