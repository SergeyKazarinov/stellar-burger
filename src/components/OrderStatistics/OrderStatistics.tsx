import {FC} from 'react';

import s from './OrderStatistics.module.scss';

interface IOrderStatisticsProps {

}

const OrderStatistics: FC<IOrderStatisticsProps> = () => {
  return (
    <div className={s.container}>
      <div className={s.ordersNumber}>
        <h3 className={'text text_type_main-medium'}>Готовы:</h3>
        <h3 className={'text text_type_main-medium'}>В работе:</h3>
        <ul className={`list text text_type_digits-default ${s.orders} ${s.orders_ready}`}>
          <li>034533</li>
          <li>034533</li>
          <li>034533</li>
          <li>034533</li>
          <li>034533</li>
        </ul>

        <ul className={`list text text_type_digits-default ${s.orders}`}>
          <li>034533</li>
          <li>034533</li>
          <li>034533</li>
          <li>034533</li>
          <li>034533</li>
        </ul>
      </div>

      <h3 className={'mt-15 text text_type_main-medium'}>Выполнено за все время:</h3>
      <p className={`text text_type_digits-large ${s.number}`}>28 752</p>

      <h3 className={'mt-15 text text_type_main-medium'}>Выполнено за сегодня:</h3>
      <p className={`text text_type_digits-large ${s.number}`}>138</p>
    </div>
  );
};

export default OrderStatistics;