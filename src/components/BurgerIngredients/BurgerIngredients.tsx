import React, {FC, UIEvent} from 'react';
import s from './BurgerIngredients.module.scss';
import Tabs from '../UI/Tabs/Tabs';
import Ingredient from '../UI/Ingridient/Ingredient';
import IngredientContainer from '../UI/IngredientContainer/IngredientContainer';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { setScrollValue } from '../../services/slices/scrollSlice';
import { BUNS, SAUCES, TOPPINGS } from '../../utils/constants';

const BurgerIngredients: FC = () => {
  const ingredients = useAppSelector(store => store.ingredients.ingredients)
  const dispatch = useAppDispatch();

  const buns = ingredients.filter((item) => item.type === 'bun');
  const sauces = ingredients.filter((item) => item.type === 'sauce');
  const mains = ingredients.filter((item) => item.type === 'main');

  const bunElements = buns.map((item) => <li key={item._id}><Ingredient ingredient={item} /></li>);
  const sauceElements = sauces.map((item) => <li key={item._id}><Ingredient ingredient={item} /></li>)
  const mainElements = mains.map((item) => <li key={item._id}><Ingredient ingredient={item} /></li>)

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    dispatch(setScrollValue(e.currentTarget.scrollTop))
  }

  return(
    <div className={s.burgerIngredients}>
      <h2 className={`mt-10 mb-5 text text_type_main-large`}>Соберите бургер</h2>
      <Tabs />
      <div className={`mt-10 ${s.burgerIngredients__ingredients}`} onScroll={handleScroll}>
        <IngredientContainer href="buns" title={BUNS}>
          {bunElements}
        </IngredientContainer>
        <IngredientContainer href="sauces" title={SAUCES}>
          {sauceElements}
        </IngredientContainer>
        <IngredientContainer href="mains" title={TOPPINGS}>
          {mainElements}
        </IngredientContainer>
      </div>
    </div>
  )
}

export default BurgerIngredients;