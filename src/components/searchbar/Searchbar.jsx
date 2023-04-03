import React, { useState } from 'react';
import css from '../searchbar/Searchbar.module.css'

export const Searchbar =({onSubmit}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = e => {
    setSearchQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return alert('enter search query');
    };
    onSubmit({ searchQuery });
    reset();
  };

  const reset = () => {
    setSearchQuery('');
  };

      return (
        <header className={css.searchbar}>
          <form className={css.searchForm} onSubmit={handleSubmit}>
            <button type="submit" className={css.searchFormButton}>
              <span className={css.searchFormButtonLabel}>Search</span>
            </button>

            <input
              className={css.searchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={handleInputChange}
              value={searchQuery}
            />
          </form>
        </header>
      );
  }
