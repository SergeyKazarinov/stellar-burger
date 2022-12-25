import {FC} from 'react';
import s from './constructor-page.module.scss';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';

const Constructor: FC = () => {
  return(
    <section className={`pb-10 ${s.constructorContainer}`}>
      <BurgerIngredients />
      <BurgerConstructor />
    </section>
  )
}

export default Constructor;