import React, {FC, useEffect} from 'react';

import OrderStatistics from '../../components/OrderStatistics/OrderStatistics';
import Orders from '../../components/Orders/Orders';
import Loader from '../../components/UI/Loader/Loader';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { useWebSocket } from '../../hooks/useWebSocket';
import { WSS_FOR_ALL_ORDERS } from '../../utils/constants';

import s from './Feed.module.scss';

interface IFeedProps {

}

const Feed: FC<IFeedProps> = () => {
  const { connect, closeWs } = useWebSocket();
  const feedOrders = useAppSelector(store => store.wsReducers.wsMessage?.orders);

  useEffect(() => {
    connect(WSS_FOR_ALL_ORDERS);

    return () => {
      closeWs();
    };
  }, []);


  return (
    !feedOrders
      ? <Loader/>
      : (
        <section className={s.feed}>
          <h2 className={`text text_type_main-medium ${s.title}`}>Лента заказов</h2>
          <div className={s.feedContainer}>
            <Orders feedOrders={feedOrders} />
            <OrderStatistics />
          </div>
        </section>)
  );
};

export default Feed;