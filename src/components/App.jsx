import React, { useEffect, useState } from 'react';
import { Button } from './button/Button';
import { ImageGallery } from './imageGallery/ImageGallery';
import { Loader } from './loader/Loader';
import { Modal } from './modal/Modal';
import { Searchbar } from './searchbar/Searchbar';
import { FetchImages } from 'services/FetchImages';

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query !== '') {
      setLoading(true);
    }
    if (images.length !== 0) {
      setLoading(false);
    }
  }, [query, images]);

  useEffect(() => {
    if (!query) {
      return;
    };

    FetchImages(query, page)
      .then(imgs => {
        if (imgs.hits.length === 0) {
          return Promise.reject(new Error(`Oops, there is no images with tag ${query}`));
        };
        setImages(prevImages => [...prevImages, ...imgs.hits]);
      })
      .catch(error => setError(error));
  }, [query, page]);

  const toggleModal = (image, name) => {
    setShowModal(!showModal);
    setUrl(image);
    setDescription(name);
  };

  const formSubmitHandler = ({ searchQuery }) => {
    if (!searchQuery) {return;}
    if (searchQuery !== query) {
      setPage(1);
      setImages([]);};
    setQuery(searchQuery);
  };

  const buttonClickHandler = () => {
    setPage(page + 1);
  };

    return (
      <div>
        {showModal && (
          <Modal
            image={url}
            name={description}
            toggleModal={toggleModal}
          />
        )}
        <Searchbar onSubmit={formSubmitHandler} />
        {error && images.length === 0 && <h2>{error.message}</h2>}
        {images.length > 0 && (
          <ImageGallery images={images} toggleModal={toggleModal} />
        )}
        {loading && <Loader />}
        {images.length > 0 && <Button buttonClick={buttonClickHandler} />}
      </div>
    );
  };
