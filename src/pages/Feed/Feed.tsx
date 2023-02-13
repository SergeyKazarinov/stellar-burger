import React, {FC, useEffect} from 'react';
import s from './Feed.module.scss';
import Orders from '../../components/Orders/Orders';
import OrderStatistics from '../../components/OrderStatistics/OrderStatistics';
import { useWebSocket } from '../../hooks/useWebSocket';
import { WSS_FOR_ALL_ORDERS } from '../../utils/constants';
import Loader from '../../components/UI/Loader/Loader';
import { useAppSelector } from '../../hooks/useTypedSelector';

interface IFeedProps {

}

const Feed: FC<IFeedProps> = () => {
  const { connect } = useWebSocket();
  const feedOrders = useAppSelector(store => store.feedOrders.feedOrders);

  useEffect(() => {
    connect(WSS_FOR_ALL_ORDERS)
  }, [])


  return (
    !feedOrders.length
    ? <Loader/>
    :
    <section className={s.feed}>
      <h2 className={`text text_type_main-medium ${s.title}`}>Лента заказов</h2>
      <div className={s.feedContainer}>
        <Orders />
        <OrderStatistics />
      </div>
    </section>
  );
}

export default Feed;