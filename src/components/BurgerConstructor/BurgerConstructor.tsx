import {FC} from 'react';
import s from './BurgerConstructor.module.scss';
import Buns from '../UI/Buns/Buns';
import { data } from '../../utils/data';
import IngredientConstructor from '../UI/IngredientConstructor/IngredientConstructor';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor: FC = () => {
  const ingredient = data.filter((item) => item.type === "main");

  return (
    <section className={`pt-25 pl-4 ${s.burgerConstructor}`}>
      <Buns>
        <li>
          <ul className={`list ${s.burgerConstructor__ingredients}`}>
            <li className='pr-2'><IngredientConstructor ingredient={ingredient[0]} /></li>
            <li className='pr-2'><IngredientConstructor ingredient={ingredient[1]} /></li>
            <li className='pr-2'><IngredientConstructor ingredient={ingredient[2]} /></li>
            <li className='pr-2'><IngredientConstructor ingredient={ingredient[3]} /></li>
            <li className='pr-2'><IngredientConstructor ingredient={ingredient[4]} /></li>
            <li className='pr-2'><IngredientConstructor ingredient={ingredient[5]} /></li>
            <li className='pr-2'><IngredientConstructor ingredient={ingredient[5]} /></li>
            <li className='pr-2'><IngredientConstructor ingredient={ingredient[5]} /></li>
          </ul>
        </li>

      </Buns>
    </section>
  )
}

export default BurgerConstructor;