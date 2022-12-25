import {FC} from 'react';
import s from './constructor-page.module.scss';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';

const Constructor: FC = () => {
  return(
    <section className={s.constructorContainer}>
      <BurgerIngredients />
    </section>
  )
}

export default Constructor;