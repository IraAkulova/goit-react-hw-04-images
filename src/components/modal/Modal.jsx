import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import css from '../modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ image, name, toggleModal }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    setImageUrl(image);
    setDescription(name);

    return () => {
          return window.removeEventListener('keydown', handleKeyDown);
    };
  }, [image, name, toggleModal]);

  const handleOverlayClick = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    toggleModal();
  };

  return createPortal(
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>
        <img src={imageUrl} alt={description} />
      </div>
    </div>,
    modalRoot
  );
};