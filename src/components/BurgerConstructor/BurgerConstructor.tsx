import {FC, useEffect} from 'react';
import s from './BurgerConstructor.module.scss';
import Buns from '../Buns/Buns';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { addIngredientsForTheBurgerConstructor, clearBurgerConstructor, setBunsForTheBurgerConstructor, setIngredientsForTheOrder, setTotalPrice } from '../../services/slices/burgerConstructorSlice';
import { setIsOpenOrderDetails } from '../../services/slices/portalSlice';
import { sendOrderThunk } from '../../services/asyncThunk/orders';
import { IIngredient } from '../../types/interfaces/IIngredient';
import { useDrop } from 'react-dnd';
import IngredientElement from '../UI/IngredientElement/IngredientElement';

interface IBurgerConstructorProps {

}
const BurgerConstructor: FC<IBurgerConstructorProps> = () => {
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
  });

  useEffect(() => {
    dispatch(setTotalPrice());
    dispatch(setIngredientsForTheOrder());
  }, [ingredientsForTheBurgerConstructor, bunsForTheBurgerConstructor])

  useEffect(() => {
    order?.order?.number && dispatch(setIsOpenOrderDetails(true));
  }, [order]);

  const handleSendOrder = () => {
    dispatch(sendOrderThunk(ingredientsForTheOrder));
    dispatch(clearBurgerConstructor())
  }

  const handleDrop = (item: IIngredient) => {
    item.type === "bun"
    ? dispatch(setBunsForTheBurgerConstructor(item))
    : dispatch(addIngredientsForTheBurgerConstructor(item));
  }

  const ingredientElements = ingredientsForTheBurgerConstructor.map((item, index) => <IngredientElement item={item} index={index} key={index}/>)

  return (
    <section className={`pt-25 pl-4 ${s.burgerConstructor} ${isHover && s.burgerConstructor_hover}`} ref={dropTarget}>
      {bunsForTheBurgerConstructor.length === 0 && ingredientsForTheBurgerConstructor.length === 0
      ? <p className={`text text_type_main-medium`}>Перетащите ингредиенты и булки для составления бургера</p>
      : <Buns>
          <li>
            <ul className={`list ${s.burgerConstructor__ingredients}`} >
              {ingredientElements}
            </ul>
          </li>
        </Buns>
      }

      <div className={`mt-10 pr-4 ${s.burgerConstructor__total}`}>
        <div className={s.burgerConstructor__flex}>
          <div className={`text text_type_digits-medium ${s.burgerConstructor__price}`}>{totalPrice}</div>
          <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="large"
          disabled={bunsForTheBurgerConstructor.length === 0 || ingredientsForTheBurgerConstructor.length === 0}
          onClick={handleSendOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;