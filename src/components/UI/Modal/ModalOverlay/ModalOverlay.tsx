import React, {FC, MouseEvent, useEffect} from 'react';

import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/useTypedSelector';

import { modalActions } from '../../../../services/slices/portalSlice';

import { TLocation } from '../../../../types/types/types';

import s from './ModalOverlay.module.scss';


const ModalOverlay: FC = () => {
  const dispatch = useAppDispatch();
  const ingredientForModal = useAppSelector(store => store.modal.ingredientForModal);
  const history = useHistory();
  const { state } = history.location as TLocation;

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  const closeModal = () => {
    dispatch(modalActions.closeAllModal());
    ingredientForModal && history.replace({...state?.from, state: {from: null}});
  };

  const handleEscClose = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <div className={s.ModalOverlay} onClick={handleClick}></div>
  );
};

export default ModalOverlay;