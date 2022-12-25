import {FC} from 'react';
import s from './BurgerConstructor.module.scss';
import Buns from '../UI/Buns/Buns';

const BurgerConstructor: FC = () => {

  return (
    <section className={`pt-25 pl-4 pr-4 ${s.burgerConstructor}`}>
      <Buns>

      </Buns>
    </section>
  )
}

export default BurgerConstructor;