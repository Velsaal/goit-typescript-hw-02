import styles from './ImageGallery.module.css';
import { Image } from '../../services/api';

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

function ImageGallery({ images, onImageClick }: ImageGalleryProps) {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li key={image.id} className={styles.item}>
          <img
            src={image.urls.small}
            alt={image.alt_description}
            className={styles.image}
            onClick={() => onImageClick(image)}
          />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery; 