import {FC, useEffect, useMemo} from 'react';

import { useParams } from 'react-router-dom';

import OrderDetails from '../../components/OrderDetails/OrderDetails';

import Loader from '../../components/UI/Loader/Loader';
import { useAppSelector } from '../../hooks/useTypedSelector';

import { useWebSocket } from '../../hooks/useWebSocket';

import { WSS_FOR_ALL_ORDERS } from '../../utils/constants';

import s from './OrderDetailsPage.module.scss';

interface IOrderDetailsPageProps {

}

const OrderDetailsPage: FC<IOrderDetailsPageProps> = () => {
  const { connect, closeWs } = useWebSocket();
  const feedOrders = useAppSelector(store => store.wsReducers.wsMessage?.orders);
  const params: {orderId: string} = useParams();
  const order = useMemo(() => feedOrders?.find((item) => item._id === params.orderId), [feedOrders]);

  useEffect(() => {
    connect(WSS_FOR_ALL_ORDERS);

    return () => {
      closeWs();
    };
  }, []);

  return (
    !feedOrders?.length
      ? <Loader />
      : (
        <section className={s.OrderDetailsPage}>
          {order && <OrderDetails order={order}/>}
        </section>
      )
  );
};

export default OrderDetailsPage;