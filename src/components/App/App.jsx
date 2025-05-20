import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Toaster } from 'react-hot-toast';

import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import { fetchImages } from '../../services/api';

Modal.setAppElement('#root');

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!query) return;

    async function getImages() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchImages(query, page);
        setImages(prev => [...prev, ...data.results]);
        setTotalPages(Math.ceil(data.total / 12));
      } catch (err) {
        setError('Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  const handleSearch = value => {
    if (value !== query) {
      setQuery(value);
      setImages([]);
      setPage(1);
    }
  };

  const openModal = data => setModalData(data);
  const closeModal = () => setModalData(null);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {!isLoading && images.length > 0 && page < totalPages && (
        <LoadMoreBtn onClick={() => setPage(prev => prev + 1)} />
      )}
      {modalData && <ImageModal data={modalData} onClose={closeModal} />}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
