import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';

import SearchBar from '../SearchBar/SearchBar.tsx';
import ImageGallery from '../ImageGallery/ImageGallery.tsx';
import Loader from '../Loader/Loader.tsx';
import ErrorMessage from '../ErrorMessage/ErrorMessage.tsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.tsx';
import ImageModal from '../ImageModal/ImageModal.tsx';
import { fetchImages, Image } from '../../services/api.ts';

Modal.setAppElement('#root');

function App() {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalData, setModalData] = useState<Image | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

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

  const handleSearch = (value: string) => {
    if (value.trim() === '') {
      toast.error('Please enter a search term');
      return;
    }
    if (value !== query) {
      setQuery(value);
      setImages([]);
      setPage(1);
    }
  };

  const openModal = (data: Image) => setModalData(data);
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
