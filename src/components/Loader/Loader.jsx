import { PulseLoader } from 'react-spinners';
import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.loader}>
      <PulseLoader color="#2196f3" size={15} />
    </div>
  );
}

export default Loader;
