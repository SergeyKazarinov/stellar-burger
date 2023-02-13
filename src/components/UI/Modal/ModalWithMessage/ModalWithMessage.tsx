import React, {FC} from 'react';

import s from './ModalWithMessage.module.scss';

interface IModalWithMessageProps {
  message: string;
}

const ModalWithMessage: FC<IModalWithMessageProps> = ({message}) => {
  return (
    <h2 className={`text text_type_main-large m-20 ${s.title}`}>{message}</h2>
  );
};

export default ModalWithMessage;