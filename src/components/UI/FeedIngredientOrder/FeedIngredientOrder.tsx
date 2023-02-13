import {FC} from 'react';

import { IIngredient } from '../../../types/interfaces/IIngredient';

import s from './FeedIngredientOrder.module.scss';

interface IFeedIngredientOrder {
  item: IIngredient;
  index?: number;
  leftIngredients?: number;
}

const FeedIngredientOrder: FC<IFeedIngredientOrder> = ({item, index, leftIngredients}) => {
  return (
    item &&
    <li style={{transform: `translateX(calc(-16px * ${index}))`, zIndex: `calc(-1 * ${index})`}} key={index}>
      <img className={`${s.image} ${index === 5 && leftIngredients !== 0 && s.imageLast}`} src={item.image} alt="Ингредиет" />
      {index === 5 && leftIngredients !== 0 && <p className={`text text_type_digits-default ${s.leftIngredients}`}>+{leftIngredients}</p>}
    </li>
  );
};

export default FeedIngredientOrder;