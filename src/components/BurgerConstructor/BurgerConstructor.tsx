import {FC, useEffect} from 'react';
import s from './BurgerConstructor.module.scss';
import Buns from '../Buns/Buns';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { setBunsForTheBurgerConstructor, setIngredientsForTheBurgerConstructor, setTotalPrice } from '../../services/slices/burgerConstructorSlice';
import { setIsOpenOrderDetails } from '../../services/slices/portalSlice';

interface IBurgerConstructorProps {

}
const BurgerConstructor: FC<IBurgerConstructorProps> = () => {
  const { ingredients } = useAppSelector(store => store.ingredients);
  const { bunsForTheBurgerConstructor, ingredientsForTheBurgerConstructor, totalPrice } = useAppSelector(store => store.burgerConstructor)
  const dispatch = useAppDispatch();
  const burgerConstructorIngredients = ingredients.filter((item) => item.type !== 'bun');
  const burgerConstructorBuns = ingredients.filter((item) => item.type === 'bun' && item.price === 1255);

  useEffect(() => {
    dispatch(setIngredientsForTheBurgerConstructor(burgerConstructorIngredients))
    dispatch(setBunsForTheBurgerConstructor(burgerConstructorBuns))
  }, []);

  useEffect(() => {
    dispatch(setTotalPrice());
  }, [ingredientsForTheBurgerConstructor, bunsForTheBurgerConstructor])

  const ingredientElements = ingredientsForTheBurgerConstructor.map((item) => <li className={`pr-2 ${s.burgerConstructor__item}`} key={item._id}>
                                                                                <DragIcon type="primary" />
                                                                                <ConstructorElement
                                                                                  text={item.name}
                                                                                  price={item.price}
                                                                                  thumbnail={item.image}
                                                                                />
                                                                              </li>)

  const handleSendOrder = () => {
    dispatch(setIsOpenOrderDetails(true))
  }

  return (
    <section className={`pt-25 pl-4 ${s.burgerConstructor}`}>
      <Buns>
        <li>
          <ul className={`list ${s.burgerConstructor__ingredients}`}>
            {ingredientElements}
          </ul>
        </li>
      </Buns>

      <div className={`mt-10 pr-4 ${s.burgerConstructor__total}`}>
        <div className={s.burgerConstructor__flex}>
          <div className={`text text_type_digits-medium ${s.burgerConstructor__price}`}>{totalPrice}</div>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={handleSendOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;