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
    <ul className={`list pr-2 ${s.orders}`}>
      {orders}
    </ul>
  );
};

export default Orders;