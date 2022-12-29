import React, {FC} from 'react';
import s from './ModalWithOrder.module.scss';
import done from '../../../../images/done.svg';

const ModalWithOrder: FC = () => {
  return (
    <>
      <h3 className={`pt-30 text text_type_digits-large ${s.textAlign}`}>034536</h3>
      <p className={`mt-8 text text_type_main-default ${s.textAlign}`}>идентификатор заказа</p>
      <img className={`${s.image}`} src={done} alt='Картинка галочки' />
      <p className={`text text_type_main-default ${s.textAlign}`}>Ваш заказ начали готовить</p>
      <p className={`mt-2 pb-20 text text_type_main-default text_color_inactive ${s.textAlign}`}>Дождитесь готовности на орбитальнйо станции</p>
    </>
  )
}

export default ModalWithOrder;