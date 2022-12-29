import React, {FC, useMemo} from 'react';
import s from './Modal.module.scss';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IModalProps {
  children: React.ReactNode;
  isOpen: boolean
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({children, isOpen, onClose}) => {
const divPortal = useMemo(() => document.getElementById('modal'), []) as Element;

  return ReactDOM.createPortal((
    <section className={s.modal}>
      <div className={`p-10 ${s.modal__container}`}>
        <header className={`${s.modal__header}`}>
          <CloseIcon type='primary' onClick={onClose}/>
        </header>
        {children}
      </div>
    </section>
  ), divPortal)
}

export default Modal;