import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {FC} from 'react';

import { useAppSelector } from '../../hooks/useTypedSelector';
import { IIngredientDetails } from '../../types/interfaces/IIngredient';
import FeedIngredientOrder from '../UI/FeedIngredientOrder/FeedIngredientOrder';

import s from './OrderIngredientItem.module.scss';

interface IOrderIngredientItemProps {
  ingredient: IIngredientDetails
}

const OrderIngredientItem: FC<IOrderIngredientItemProps> = ({ingredient}) => {
  return (
    <div className={s.item}>
      <FeedIngredientOrder item={ingredient}/>
      <p className={`text text_type_main-default ${s.title}`}>{ingredient.name}</p>
      <div className={s.price}>
        <p className={'text text_type_digits-default'}>{ingredient.quantity}&#160;x&#160;{ingredient.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  );
};

export default OrderIngredientItem;