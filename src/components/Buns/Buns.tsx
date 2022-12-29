import React, {FC} from 'react';
import s from './Buns.module.scss';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../utils/data';

interface IBunsProps {
  children?: React.ReactNode;
  onClick: () => void;
}

const Buns: FC<IBunsProps> = ({children, onClick}) => {
  const buns = data.filter((item) => item.type === 'bun');


  return (
    <div className={s.buns}>
      <ul className={`list ${s.buns__list}`}>
        <li><ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={buns[0].price}
          thumbnail={buns[0].image}
          extraClass={`ml-8 mr-4 ${s.constructorElement}`}
        />
        </li>

        {children}

        <li><ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={buns[0].price}
          thumbnail={buns[0].image}
          extraClass={`ml-8 mr-4 ${s.constructorElement}`}
        />
        </li>
      </ul>


      <div className={`mt-10 pr-4 ${s.buns__total}`}>
        <div className={s.buns__flex}>
          <div className={`text text_type_digits-medium ${s.buns__price}`}>610</div>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={onClick}>
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

export default Buns;