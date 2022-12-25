import React, {FC} from 'react';
import s from './IngredientConstructor.module.scss';
import { CurrencyIcon, DeleteIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IData } from '../../../types/interface/IData';

interface IIngredientConstructorProps {
  ingredient: IData;
}

const IngredientConstructor: FC<IIngredientConstructorProps> = ({ingredient}) => {
  return (
    <div className={` ${s.ingredientConstructor}`}>
      <DragIcon type="primary" />
      <div className={`pl-6 pt-4 pr-8 pb-4 ${s.ingredientConstructor__container}`}>
        <img className={s.ingredientConstructor__image} src={ingredient.image} alt={ingredient.name} />
        <p className={`text text_type_main-default ${s.ingredientConstructor__name}`}>{ingredient.name}</p>
        <p className={`text text_type_digits-default`}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
        <DeleteIcon type="secondary" />
      </div>
    </div>
  )
}

export default IngredientConstructor;