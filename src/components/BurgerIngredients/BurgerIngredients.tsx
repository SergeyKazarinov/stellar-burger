import {FC, useState, UIEvent} from 'react';
import s from './BurgerIngredients.module.scss';
import Tabs from '../UI/Tabs/Tabs';
import Ingredient from '../UI/Ingridient/Ingredient';
import IngredientContainer from '../UI/IngredientContainer/IngredientContainer';
import { data } from '../../utils/data';

const BurgerIngredients: FC = () => {
  const [scrollValue, setScrollValue] = useState(0);
  const buns = data.filter((item) => item.type === 'bun');
  const sauces = data.filter((item) => item.type === 'sauce');
  const mains = data.filter((item) => item.type === 'main');

  const bunElements = buns.map((item) => <li key={item._id}><Ingredient ingredient={item} /></li>);
  const sauceElements = sauces.map((item) => <li key={item._id}><Ingredient ingredient={item} /></li>)
  const mainElements = mains.map((item) => <li key={item._id}><Ingredient ingredient={item} /></li>)

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    setScrollValue(e.currentTarget.scrollTop);
    console.log(e.currentTarget.scrollTop);
  }

  return(
    <div className={s.burgerIngredients}>
      <h2 className={`mt-10 mb-5 text text_type_main-large`}>Соберите бургер</h2>
      <Tabs />
      <div className={`${s.burgerIngredients__ingredients}`} onScroll={handleScroll}>
        <IngredientContainer title='Булки'>
          {bunElements}
        </IngredientContainer>
        <IngredientContainer title='Соусы'>
          {sauceElements}
        </IngredientContainer>
        <IngredientContainer href="main" title='Начинки'>
          {mainElements}
        </IngredientContainer>
      </div>
    </div>
  )
}

export default BurgerIngredients;