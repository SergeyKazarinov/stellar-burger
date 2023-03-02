import React, {FC, MouseEvent, useEffect} from 'react';

import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../hooks/useTypedSelector';

import { burgerConstructorActions } from '../../../../services/slices/burgerConstructorSlice';
import { modalActions } from '../../../../services/slices/portalSlice';

import { TLocation } from '../../../../types/types/types';

import s from './ModalOverlay.module.scss';


const ModalOverlay: FC = () => {
  const dispatch = useAppDispatch();
  const ingredientForModal = useAppSelector(store => store.modal.ingredientForModal);
  const orderForModal = useAppSelector(store => store.modal.orderForModal);
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
    dispatch(burgerConstructorActions.setOrder(null));
    (ingredientForModal || orderForModal)
    && history.replace({...state?.background, state: {background: null}});
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