import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

function SearchBar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      toast.error('Please enter a search term');
      return;
    }

    onSubmit(value.trim());
    setValue('');
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}

export default SearchBar;
