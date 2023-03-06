import {FC, useEffect, useMemo} from 'react';

import { useHistory, useLocation, useParams } from 'react-router-dom';

import OrderDetails from '../../components/OrderDetails/OrderDetails';

import Loader from '../../components/UI/Loader/Loader';
import { useAppSelector } from '../../hooks/useTypedSelector';

import { useWebSocket } from '../../hooks/useWebSocket';

import { ACCESS_TOKEN, WSS_FOR_ALL_ORDERS, WSS_FOR_PROFILE_ORDERS } from '../../utils/constants';

import PageNotFound from '../PageNotFound/PageNotFound';

import s from './OrderDetailsPage.module.scss';

interface IOrderDetailsPageProps {

}

const OrderDetailsPage: FC<IOrderDetailsPageProps> = () => {
  const { connect, closeWs } = useWebSocket();
  const location = useLocation();
  const history = useHistory();
  const feedOrders = useAppSelector(store => store.wsReducers.wsMessage?.orders);
  const params: {orderId: string} = useParams();
  const order = useMemo(
    () => (
      feedOrders?.find((item) => item._id === params.orderId)
    ), [feedOrders]);

  const accessToken = useMemo(
    () => (
      localStorage.getItem(ACCESS_TOKEN)?.replace('Bearer ', '')
    ), [localStorage.getItem(ACCESS_TOKEN)]);

  useEffect(() => {
    if (location.pathname === `/feed/${params.orderId}`) {
      connect(WSS_FOR_ALL_ORDERS);
    } else if (location.pathname === `/profile/orders/${params.orderId}`) {
      connect((`${WSS_FOR_PROFILE_ORDERS}?token=${accessToken}`));
    }

    return () => {
      closeWs();
    };
  }, []);

  return (
    !feedOrders?.length
      ? <Loader />
      : order
        ? <section className={s.OrderDetailsPage}>
          <OrderDetails order={order}/>
        </section>
        : <PageNotFound />
  );
};

export default OrderDetailsPage;