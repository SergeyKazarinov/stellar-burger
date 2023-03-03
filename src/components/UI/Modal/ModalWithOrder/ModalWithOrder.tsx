import React, {FC} from 'react';

import { useAppSelector } from '../../../../hooks/useTypedSelector';
import done from '../../../../images/done.svg';

import s from './ModalWithOrder.module.scss';

const ModalWithOrder: FC = () => {
  const order = useAppSelector(store => store.burgerConstructor.order);

  return (
    <>
      <h3 className={`pt-20 text text_type_digits-large ${s.textAlign}`}>{order?.order?.number}</h3>
      <p className={`mt-8 text text_type_main-default ${s.textAlign}`}>идентификатор заказа</p>
      <img className={`${s.image}`} src={done} alt='Картинка галочки' />
      <p className={`text text_type_main-default ${s.textAlign}`}>Ваш заказ готов</p>
      <p className={`mt-2 pb-20 text text_type_main-default text_color_inactive ${s.textAlign}`}>
        Вы можете забрать свой заказ на орбитальной станции
      </p>
    </>
  );
};

export default ModalWithOrder;