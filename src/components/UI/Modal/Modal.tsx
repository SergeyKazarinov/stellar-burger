import React, {FC, useMemo} from 'react';
import s from './Modal.module.scss';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import ModalOverlay from './ModalOverlay/ModalOverlay';
import { modalActions } from '../../../services/slices/portalSlice';
import { useHistory } from 'react-router-dom';
import { TLocation } from '../../../types/types/TLocation';

interface IModalProps {
  children: React.ReactNode;
  onClose?: () => void;
}

const Modal: FC<IModalProps> = ({children}) => {
  const divPortal = useMemo(() => document.getElementById('modal'), []) as Element;
  const { ingredient, isOpenIngredientDetail } = useAppSelector(store => store.modal);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { state } = history.location as TLocation;

  const handleClose = () => {
    dispatch(modalActions.closeAllModal())

    isOpenIngredientDetail && history.push({...state.from, state: {from: null}});
  }

  return ReactDOM.createPortal((

    <section className={s.modal}>
      <ModalOverlay />
      <div className={`p-10 ${s.modal__container}`}>
        <header className={`${s.modal__header} ${isOpenIngredientDetail && s.modal__title}`}>
          <h2 className={`text text_type_main-large`}>{isOpenIngredientDetail && 'Детали ингредиента'}</h2>
          <CloseIcon type='primary' onClick={handleClose}/>
        </header>
        {children}
      </div>
    </section>
  ), divPortal)
}

export default Modal;