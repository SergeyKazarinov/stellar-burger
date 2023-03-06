import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {FC, useMemo, memo} from 'react';

import { useDrag } from 'react-dnd';
import { useHistory, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { modalActions } from '../../../services/slices/portalSlice';
import { IIngredient } from '../../../types/interfaces/IIngredient';

import s from './Ingredient.module.scss';

interface IIngredientProps {
  ingredient: IIngredient;
}

const Ingredient: FC<IIngredientProps> = ({ingredient}) => {
  const ingredientsForTheOrder = useAppSelector(store => store.burgerConstructor.ingredientsForTheOrder);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  const counter = useMemo(() => (
    ingredientsForTheOrder.reduce((value, item) => {
      ingredient._id === item && (value += 1);
      return value;
    }, 0)
  ), [ingredientsForTheOrder]);

  const handleOpenIngredientDetails = () => {
    dispatch(modalActions.setIsOpenIngredientDetail(ingredient));

    history.push({ pathname: `/ingredients/${ingredient._id}`, state: {background: location}});
  };

  return (
    <div className={s.ingredient} onClick={handleOpenIngredientDetails} ref={dragRef}>
      <img className={'ml-4 mr-4'} src={ingredient.image} alt="Ингредиент"/>
      <div className={`mt-1 mb-1 ${s.ingredient__price}`}>
        <p className={'text text_type_digits-default'}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${s.ingredient__subtitle}`}>{ingredient.name}</p>
      {!!counter && <Counter count={counter} size="default" extraClass="m-1" />}
    </div>
  );
};

export default memo(Ingredient);