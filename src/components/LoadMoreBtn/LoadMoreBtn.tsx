import styles from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onClick: () => void;
}

function LoadMoreBtn({ onClick }: LoadMoreBtnProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      Load more
    </button>
  );
}

export default LoadMoreBtn; 