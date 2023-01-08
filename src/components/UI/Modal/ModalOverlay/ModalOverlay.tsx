import React, {FC, MouseEvent, useEffect} from 'react';
import s from './ModalOverlay.module.scss';
import { useAppDispatch } from '../../../../hooks/useTypedSelector';
import { closeAllModal } from '../../../../services/slices/portalSlice';

const ModalOverlay: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [])

  const handleEscClose = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      dispatch(closeAllModal())
    }
  }

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(closeAllModal())
    }
  }
  return (
    <div className={s.ModalOverlay} onClick={handleClick}></div>
  );
}

export default ModalOverlay;