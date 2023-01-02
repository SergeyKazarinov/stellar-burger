import React, {FC} from 'react';
import s from './Buns.module.scss';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { setIsOpenOrderDetails } from '../../services/slices/portalSlice';

interface IBunsProps {
  children?: React.ReactNode;
}

const Buns: FC<IBunsProps> = ({children}) => {
  const { ingredients } = useAppSelector(store => store.ingredients)
  const buns = ingredients.filter((item) => item.type === 'bun');
  const dispatch = useAppDispatch();

  const handleSendOrder = () => {
    dispatch(setIsOpenOrderDetails(true))
  }

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
        <Button htmlType="button" type="primary" size="large" onClick={handleSendOrder}>
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

export default Buns;