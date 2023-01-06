import {FC, useEffect, useState} from 'react';
import s from './Ingredient.module.scss';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from '../../../types/interfaces/IIngredient';
import { useAppDispatch, useAppSelector } from '../../../hooks/useTypedSelector';
import { setIsOpenIngredientDetail } from '../../../services/slices/portalSlice';
import { useDrag } from 'react-dnd/dist/hooks';

interface IIngredientProps {
  ingredient: IIngredient;
}

const Ingredient: FC<IIngredientProps> = ({ingredient}) => {
  const [counter, setCounter] = useState(0)
  const { ingredientsForTheOrder } = useAppSelector(store => store.burgerConstructor)
  const dispatch = useAppDispatch();
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient
  })

  useEffect(() => {
    const counter = ingredientsForTheOrder.reduce((value, item) => {
      ingredient._id === item && (value += 1)
      return value;
    }, 0)
    setCounter(counter);
  }, [ingredientsForTheOrder])

  const handleOpenIngredientDetails = () => {
    dispatch(setIsOpenIngredientDetail({isOpen: true, ingredient}))
  }

  return (
    <div className={s.ingredient} onClick={handleOpenIngredientDetails} ref={dragRef}>
      <img className={`ml-4 mr-4`} src={ingredient.image} alt="Ингредиент"/>
      <div className={`mt-1 mb-1 ${s.ingredient__price}`}>
        <p className={`text text_type_digits-default`}>{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${s.ingredient__subtitle}`}>{ingredient.name}</p>
      {!!counter && <Counter count={counter} size="default" extraClass="m-1" />}
    </div>
  )
}

export default Ingredient;