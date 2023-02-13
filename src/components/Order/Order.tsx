import {FC, useMemo} from 'react';
import s from './Order.module.scss';
import { useAppSelector } from '../../hooks/useTypedSelector';
import FeedIngredientOrder from '../UI/FeedIngredientOrder/FeedIngredientOrder';
import OrderStatus from './OrderStatus/OrderStatus';
import { useLocation } from 'react-router-dom';
import TotalPrice from '../TotalPrice/TotalPrice';
import { IFeedOrder } from '../../types/interfaces/IOrder';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from '../../types/interfaces/IIngredient';
import { checkTotalPrice } from '../../services/helpers/checkTotalPrice';

interface IOrderProps {
  order: IFeedOrder;
}

const Order: FC<IOrderProps> = ({order}) => {
  const ingredients = useAppSelector(store => store.ingredients.ingredients)
  const url = useLocation();
  const date = new Date(order.createdAt);
  const ingredientsOfTheOrders: IIngredient[] = order.ingredients.map((i) => {
    const item = ingredients.find(item => item._id === i)
    return item ? item : ingredients[0];
  });

  const ingredientsOrder = useMemo(
    () => {
      return order.ingredients.slice(0, 6).map((item, index) => {
        const ingredientsItem = ingredients.filter((i) => i._id === item)[0];
        return <FeedIngredientOrder key={index} item={ingredientsItem} index={index} leftIngredients={order.ingredients.slice(6).length} />
      })
    }, [order, ingredients])

  return (
    <button className={`button p-6 ${s.container}`}>
      <div className={s.numberOrder}>
        <span className={`text text_type_digits-default ${s.number}`}>{`#${order.number}`}</span>
        <FormattedDate className={`text text_type_main-default text_color_inactive ${s.date}`} date={date} />
        {/* <span className={`text text_type_main-default text_color_inactive ${s.date}`}>Сегодня, 16:20 i-GMT+3</span> */}
      </div>
      <h3 className={`mt-6 text text_type_main-medium ${s.titleBurger}`}>{order.name}</h3>
      {url.pathname.includes('profile') && <OrderStatus orderStatus={order.status}/>}
      <div className={`mt-4 ${s.ingredientsContainer}`}>
        <ul className={`list ${s.items}`}>
          {ingredientsOrder}
        </ul>
        <TotalPrice totalPrice={checkTotalPrice(ingredientsOfTheOrders)} />
      </div>
    </button>
  );
}

export default Order;