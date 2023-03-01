import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import {FC, useMemo} from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';

import { checkTotalPrice } from '../../services/helpers/checkTotalPrice';
import { modalActions } from '../../services/slices/portalSlice';
import { IIngredient } from '../../types/interfaces/IIngredient';
import { IFeedOrder } from '../../types/interfaces/IOrder';
import TotalPrice from '../TotalPrice/TotalPrice';
import FeedIngredientOrder from '../UI/FeedIngredientOrder/FeedIngredientOrder';

import s from './Order.module.scss';

import OrderStatus from './OrderStatus/OrderStatus';



interface IOrderProps {
  order: IFeedOrder;
}

const Order: FC<IOrderProps> = ({order}) => {
  const ingredients = useAppSelector(store => store.ingredients.ingredients);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const date = new Date(order.createdAt);
  const ingredientsOfTheOrders: IIngredient[] = order.ingredients.map((i) => {
    const item = ingredients.find(item => item._id === i);
    return item ? item : ingredients[0];//исправить
  });

  const ingredientsOrder = useMemo(
    () => {
      return order.ingredients.slice(0, 6).map((item, index) => {
        const ingredientsItem = ingredients.find((i) => i._id === item);
        return ingredientsItem &&
        <li
          style={{transform: `translateX(calc(-16px * ${index}))`, zIndex: `calc(-1 * ${index})`}}
          key={index}><FeedIngredientOrder
            item={ingredientsItem}
            index={index}
            leftIngredients={order.ingredients.slice(6).length}
          /></li>;
      });
    }, [order, ingredients]);

  const handleOpenOrderDetails = () => {
    dispatch(modalActions.setIsOpenModalWithOrderDetails(order));

    history.push({pathname: `/feed/${order._id}`, state: {background: location}});
  };

  return (
    <button className={`button p-6 ${s.container}`} onClick={handleOpenOrderDetails}>
      <div className={s.numberOrder}>
        <span className={`text text_type_digits-default ${s.number}`}>{`#${order.number}`}</span>
        <FormattedDate
          className={'text text_type_main-default text_color_inactive'}
          date={date}
        />
        {/* <span className={`text text_type_main-default text_color_inactive ${s.date}`}>
          Сегодня, 16:20 i-GMT+3
        </span> */}
      </div>
      <h3 className={`mt-6 text text_type_main-medium ${s.titleBurger}`}>{order.name}</h3>
      {location.pathname.includes('profile') && <OrderStatus orderStatus={order.status}/>}
      <div className={`mt-4 ${s.ingredientsContainer}`}>
        <ul className={`list ${s.items}`}>
          {ingredientsOrder}
        </ul>
        <TotalPrice totalPrice={checkTotalPrice(ingredientsOfTheOrders)} />
      </div>
    </button>
  );
};

export default Order;