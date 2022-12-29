import {FC} from 'react';
import s from './constructor-page.module.scss';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';

interface IConstructorProps {
  onClick: () => void;
}
const Constructor: FC<IConstructorProps> = ({onClick}) => {
  return(
    <section className={`pb-10 ${s.constructorContainer}`}>
      <BurgerIngredients />
      <BurgerConstructor onClick={onClick}/>
    </section>
  )
}

export default Constructor;