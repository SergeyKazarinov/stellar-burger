import React, {FC, useMemo} from 'react';
import s from './Modal.module.scss';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { closeAllModal } from '../../../services/slices/portalSlice';
import ModalOverlay from './ModalOverlay/ModalOverlay';

interface IModalProps {
  children: React.ReactNode;
  title?: string;
  onClose?: () => void;
}

const Modal: FC<IModalProps> = ({children, title}) => {
  const divPortal = useMemo(() => document.getElementById('modal'), []) as Element;
  const { ingredient, isOpenIngredientDetail } = useAppSelector(store => store.modal);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(closeAllModal());
  }

  return ReactDOM.createPortal((

    <section className={s.modal}>
      <ModalOverlay />
      <div className={`p-10 ${s.modal__container}`}>
        <header className={`${s.modal__header} ${isOpenIngredientDetail && s.modal__title}`}>
          <h2 className={`text text_type_main-large`}>{isOpenIngredientDetail && ingredient?.name}</h2>
          <CloseIcon type='primary' onClick={handleClose}/>
        </header>
        {children}
      </div>
    </section>
  ), divPortal)
}

export default Modal;