import {FC, useEffect} from 'react';
import s from './BurgerConstructor.module.scss';
import Buns from '../Buns/Buns';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { addIngredientsForTheBurgerConstructor, removeIngredientForTheBurgerConstructor, setBunsForTheBurgerConstructor, setIngredientsForTheOrder, setTotalPrice } from '../../services/slices/burgerConstructorSlice';
import { setIsOpenOrderDetails } from '../../services/slices/portalSlice';
import { sendOrderThunk } from '../../services/asyncThunk/orders';
import { useDrop } from 'react-dnd/dist/hooks/useDrop';
import { IIngredient } from '../../types/interfaces/IIngredient';

interface IBurgerConstructorProps {

}
const BurgerConstructor: FC<IBurgerConstructorProps> = () => {
  const { ingredients } = useAppSelector(store => store.ingredients);
  const { bunsForTheBurgerConstructor, ingredientsForTheBurgerConstructor, totalPrice, ingredientsForTheOrder, order } = useAppSelector(store => store.burgerConstructor)
  const dispatch = useAppDispatch();
  const [{isHover}, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: IIngredient) {
      handleDrop(item)
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  })

  const backgroundColor = isHover ? '#ffffff05' : '#131316'

  useEffect(() => {
    dispatch(setTotalPrice());
    dispatch(setIngredientsForTheOrder());
  }, [ingredientsForTheBurgerConstructor, bunsForTheBurgerConstructor])


  const handleSendOrder = () => {
    dispatch(sendOrderThunk(ingredientsForTheOrder))
  }

  useEffect(() => {
    order?.order.number && dispatch(setIsOpenOrderDetails(true));
  }, [order]);

  const handleDrop = (item: IIngredient) => {
    item.type === "bun"
    ? dispatch(setBunsForTheBurgerConstructor(item))
    : dispatch(addIngredientsForTheBurgerConstructor(item));
  }

  const ingredientElements = ingredientsForTheBurgerConstructor.map((item, index) => {
    const handleDeleteIngredient = () => {
      dispatch(removeIngredientForTheBurgerConstructor(index))
    }

  return <li className={`pr-2 ${s.burgerConstructor__item}`} key={index}>
    <DragIcon type="primary" />
    <ConstructorElement
      text={item.name}
      price={item.price}
      thumbnail={item.image}
      handleClose={handleDeleteIngredient}
    />
  </li>})

  return (
    <section className={`pt-25 pl-4 ${s.burgerConstructor}`} style={{backgroundColor}}ref={dropTarget}>
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