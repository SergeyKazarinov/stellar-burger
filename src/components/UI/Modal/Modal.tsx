import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {FC, useMemo} from 'react';

import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { modalActions } from '../../../services/slices/portalSlice';

import { TLocation } from '../../../types/types/types';

import s from './Modal.module.scss';
import ModalOverlay from './ModalOverlay/ModalOverlay';

interface IModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const Modal: FC<IModalProps> = ({children}) => {
  const divPortal = useMemo(() => document.getElementById('modal'), []) as Element;
  const ingredientForModal = useAppSelector(store => store.modal.ingredientForModal);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { state } = history.location as TLocation;

  const handleClose = () => {
    dispatch(modalActions.closeAllModal());

    ingredientForModal && history.replace({...state?.from, state: {from: null}});
  };

  return ReactDOM.createPortal((

    <section className={s.modal}>
      <ModalOverlay />
      <div className={`p-10 ${s.modal__container}`}>
        <header className={`${s.modal__header} ${ingredientForModal && s.modal__title}`}>
          <h2 className={'text text_type_main-large'}>
            {ingredientForModal && 'Детали ингредиента'}
          </h2>
          <CloseIcon type='primary' onClick={handleClose}/>
        </header>
        {children}
      </div>
    </section>
  ), divPortal);
};

export default Modal;