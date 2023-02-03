import {FC} from 'react';
import s from './Order.module.scss';
import { useAppSelector } from '../../hooks/useTypedSelector';
import FeedIngredientOrder from '../UI/FeedIngredientOrder/FeedIngredientOrder';
import OrderStatus from './OrderStatus/OrderStatus';
import { useLocation } from 'react-router-dom';
import TotalPrice from '../TotalPrice/TotalPrice';

interface IOrderProps {

}

const Order: FC<IOrderProps> = () => {
  const ingredients = useAppSelector(store => store.ingredients.ingredients)
  const url = useLocation();

  const ingredientsOrder = ingredients.slice(0, 6).map((item, index) => <FeedIngredientOrder key={index} item={item} index={index} leftIngredients={ingredients.slice(6).length}/>)
  return (
    <button className={`button p-6 ${s.container}`}>
      <div className={s.numberOrder}>
        <span className={`text text_type_digits-default ${s.number}`}>#034535</span>
        <span className={`text text_type_main-default text_color_inactive ${s.date}`}>Сегодня, 16:20 i-GMT+3</span>
      </div>
      <h3 className={`mt-6 text text_type_main-medium ${s.titleBurger}`}>Death Star Starship Main бургер</h3>
      {url.pathname.includes('profile') && <OrderStatus />}
      <div className={`mt-4 ${s.ingredientsContainer}`}>
        <ul className={`list ${s.items}`}>
          {ingredientsOrder}
        </ul>
        <TotalPrice totalPrice={480} />
      </div>
    </button>
  );
}

export default Order;