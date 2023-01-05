import React, {FC} from 'react';
import s from './Buns.module.scss';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../hooks/useTypedSelector';

interface IBunsProps {
  children?: React.ReactNode;
}

const Buns: FC<IBunsProps> = ({children}) => {
  const { bunsForTheBurgerConstructor } = useAppSelector(store => store.burgerConstructor);

  return (
    <div className={s.buns}>
      <ul className={`list ${s.buns__list}`}>
        {bunsForTheBurgerConstructor.length > 0 && (
        <li><ConstructorElement
          type="top"
          isLocked={true}
          text={`${bunsForTheBurgerConstructor[0].name} (верх)`}
          price={bunsForTheBurgerConstructor[0].price}
          thumbnail={bunsForTheBurgerConstructor[0].image}
          extraClass={`ml-8 mr-4 ${s.constructorElement}`}
          />
        </li>)}

        {children}

        {bunsForTheBurgerConstructor.length > 0 && (
        <li><ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bunsForTheBurgerConstructor[0].name} (низ)`}
          price={bunsForTheBurgerConstructor[0].price}
          thumbnail={bunsForTheBurgerConstructor[0].image}
          extraClass={`ml-8 mr-4 ${s.constructorElement}`}
        />
        </li>)}
      </ul>
    </div>
  )
}

export default Buns;