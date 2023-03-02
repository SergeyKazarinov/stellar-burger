import React, {FC, useMemo} from 'react';

import { useAppSelector } from '../../hooks/useTypedSelector';
import Order from '../Order/Order';

import s from './Orders.module.scss';

interface IOrdersProps {

}

const Orders: FC<IOrdersProps> = () => {
  const feedOrders = useAppSelector(store => store.wsReducers.wsMessage?.orders);

  const orders = useMemo(
    () => feedOrders?.map((item) => <li key={item._id}><Order order={item} /> </li>)
    , [feedOrders]);

  return (
    orders?.length
      ? (<ul className={`list pr-2 ${s.orders}`}>
        {orders}
      </ul>)
      : <p className={`text text_type_main-large ${s.subtitle}`}>Заказовы отсутствуют</p>
  );
};

export default Orders;