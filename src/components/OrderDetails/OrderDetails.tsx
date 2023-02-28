import {FC} from 'react';

import { useAppSelector } from '../../hooks/useTypedSelector';
import { checkTotalPrice } from '../../services/helpers/checkTotalPrice';
import { filterIngredients } from '../../services/helpers/filterIngredients';
import { sortIngredientsDetails } from '../../services/helpers/sortIngredientsDetails';
import { IFeedOrder, IOrderStatus } from '../../types/interfaces/IOrder';
import OrderIngredientItem from '../OrderIngredientItem/OrderIngredientItem';

import TotalPrice from '../TotalPrice/TotalPrice';

import s from './OrderDetails.module.scss';

interface IOrderDetailsProps {
  order: IFeedOrder
}

const OrderDetails: FC<IOrderDetailsProps> = ({order}) => {
  const ingredients = useAppSelector(store => store.ingredients.ingredients);
  const ingredientArray = filterIngredients(ingredients, order.ingredients);
  const sortArray = sortIngredientsDetails(ingredientArray);

  const ingredientList = sortArray.map(
    (item, index) => {
      return <li key={index}><OrderIngredientItem ingredient={item}/></li>;
    },
  );

  return (
    <div className={s.OrderDetails}>
      <h2 className={`text text_type_digits-default ${s.orderNumber}`}>{`#${order.number}`}</h2>
      <h3 className={`mt-10 text text_type_main-medium ${s.orderName}`}>
        {order.name}
      </h3>
      <p className={`text text_type_main-default mt-2 ${s.status}`}>
        {order.status === IOrderStatus.done ? 'Выполнен' : 'Готовится'}
      </p>
      <h4 className={`mt-15 mb-6 text text_type_main-medium ${s.composition}`}>Состав:</h4>
      <ul className={`list pr-6 ${s.compositionContainer}`}>
        {ingredientList}
      </ul>
      <div className={`mt-10 ${s.totalPrice}`}>
        <p className={'text text_type_main-default text_color_inactive'}>Вчера, 13:50 i-GMT+3</p>
        <TotalPrice totalPrice={checkTotalPrice(ingredientArray)} />
      </div>
    </div>
  );
};

export default OrderDetails;