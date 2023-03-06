import {FC, UIEvent, memo, useCallback, useMemo} from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { setScrollValue } from '../../services/slices/scrollSlice';
import { BUNS, SAUCES, TOPPINGS } from '../../utils/constants';
import IngredientContainer from '../UI/IngredientContainer/IngredientContainer';
import Ingredient from '../UI/Ingridient/Ingredient';
import Tabs from '../UI/Tabs/Tabs';

import s from './BurgerIngredients.module.scss';

const BurgerIngredients: FC = () => {
  const ingredients = useAppSelector(store => store.ingredients.ingredients);
  const dispatch = useAppDispatch();

  const buns = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);
  const mains = useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);

  const bunElements = useMemo(() => buns.map((item) => <li key={item._id}><Ingredient ingredient={item} /></li>), [buns]);
  const sauceElements = useMemo(() => sauces.map((item) => <li key={item._id}><Ingredient ingredient={item} /></li>), [sauces]);
  const mainElements = useMemo(() => mains.map((item) => <li key={item._id}><Ingredient ingredient={item} /></li>), [mains]);

  const handleScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
    dispatch(setScrollValue(e.currentTarget.scrollTop));
  }, []);

  return(
    <div className={s.burgerIngredients}>
      <h2 className={'mt-10 mb-5 text text_type_main-large'}>Соберите бургер</h2>
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
  );
};

export default memo(BurgerIngredients);