import Modal from 'react-modal';
import styles from './ImageModal.module.css';

function ImageModal({ data, onClose }) {
  return (
    <Modal
      isOpen={!!data}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <img src={data.urls.regular} alt={data.alt_description} className={styles.image} />
    </Modal>
  );
}

export default ImageModal