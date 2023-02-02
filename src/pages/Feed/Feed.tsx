import React, {FC} from 'react';
import s from './Feed.module.scss';
import Orders from '../../components/Orders/Orders';

interface IFeedProps {

}

const Feed: FC<IFeedProps> = () => {
  return (
    <section className={s.feed}>
      <h2 className={`text text_type_main-medium ${s.title}`}>Лента заказов</h2>
      <div className={s.feedContainer}>
        <Orders />
      </div>
    </section>
  );
}

export default Feed;