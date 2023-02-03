import React, {FC} from 'react';
import s from './Feed.module.scss';
import Orders from '../../components/Orders/Orders';
import OrderStatistics from '../../components/OrderStatistics/OrderStatistics';
import { Route, Switch } from 'react-router-dom';
import OrderPage from '../Profile/ProfileOrders/OrderPage/OrderPage';

interface IFeedProps {

}

const Feed: FC<IFeedProps> = () => {
  return (
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