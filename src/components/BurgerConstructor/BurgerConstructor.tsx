import {FC} from 'react';
import s from './BurgerConstructor.module.scss';
import Buns from '../Buns/Buns';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../hooks/useTypedSelector';

interface IBurgerConstructorProps {

}
const BurgerConstructor: FC<IBurgerConstructorProps> = () => {
  const { ingredients } = useAppSelector(store => store.ingredients)
  const ingredient = ingredients.filter((item) => item.type === "main");

  return (
    <section className={`pt-25 pl-4 ${s.burgerConstructor}`}>
      <Buns>
        <li>
          <ul className={`list ${s.burgerConstructor__ingredients}`}>
            <li className={`pr-2 ${s.burgerConstructor__item}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={ingredient[0].price}
                thumbnail={ingredient[0].image}
              />
            </li>
            <li className={`pr-2 ${s.burgerConstructor__item}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={ingredient[0].price}
                thumbnail={ingredient[0].image}
              />
            </li>
            <li className={`pr-2 ${s.burgerConstructor__item}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={ingredient[0].price}
                thumbnail={ingredient[0].image}
              />
            </li>
            <li className={`pr-2 ${s.burgerConstructor__item}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={ingredient[0].price}
                thumbnail={ingredient[0].image}
              />
            </li>
          </ul>
        </li>
      </Buns>
    </section>
  )
}

export default BurgerConstructor;