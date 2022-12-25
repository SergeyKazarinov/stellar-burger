import {FC} from 'react';
import s from './Ingredient.module.scss';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IData } from '../../../types/interface/IData';

interface IIngredientProps {
  ingredient: IData;
}

const Ingredient: FC<IIngredientProps> = ({ingredient}) => {
  return (
    <div className={s.ingredient}>
      <img className={`ml-4 mr-4`} src={ingredient.image} alt="Ингредиент"/>
      <div className={`mt-1 mb-1 ${s.ingredient__price}`}>
        <p className={`text text_type_digits-default`}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${s.ingredient__subtitle}`}>{ingredient.name}</p>
      <Counter count={1} size="default" extraClass="m-1" />
    </div>
  )
}

export default Ingredient;