import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {FC, memo, useEffect} from 'react';

import { useDrop } from 'react-dnd';

import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { sendOrderThunk } from '../../services/asyncThunk/ordersThunk';
import { checkTotalPrice } from '../../services/helpers/checkTotalPrice';
import {burgerConstructorActions} from '../../services/slices/burgerConstructorSlice';
import { IIngredient } from '../../types/interfaces/IIngredient';
import Buns from '../Buns/Buns';
import IngredientElement from '../UI/IngredientElement/IngredientElement';

import s from './BurgerConstructor.module.scss';

const BurgerConstructor: FC = () => {
  const {
    bunsForTheBurgerConstructor,
    ingredientsForTheBurgerConstructor,
    ingredientsForTheOrder,
    isLoaderOrder,
    order,
    errorMessage,
  } = useAppSelector(store => store.burgerConstructor);
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(store => store.profile.isLogin);
  const history = useHistory();
  const [{isHover}, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: IIngredient) {
      handleDrop(item);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  });

  useEffect(() => {
    dispatch(burgerConstructorActions.setIngredientsForTheOrder());
  }, [ingredientsForTheBurgerConstructor, bunsForTheBurgerConstructor]);

  useEffect(() => {
    order && dispatch(burgerConstructorActions.clearBurgerConstructor());
  }, [order]);

  const handleSendOrder = () => {
    !isLogin
      ? history.push('/login', {background: history.location})
      : dispatch(sendOrderThunk(ingredientsForTheOrder));
  };

  const handleDrop = (item: IIngredient) => {
    item.type === 'bun'
      ? dispatch(burgerConstructorActions.setBunsForTheBurgerConstructor(item))
      : dispatch(burgerConstructorActions.addIngredientsForTheBurgerConstructor(item));
  };

  const ingredientElements = ingredientsForTheBurgerConstructor.map(
    (item, index) => <IngredientElement item={item} index={index} key={index}/>,
  );

  return (
    <div
      className={`pt-25 pl-4 ${s.burgerConstructor} ${isHover && s.burgerConstructor_hover}`}
      ref={dropTarget}
    >
      {(bunsForTheBurgerConstructor.length === 0
      && ingredientsForTheBurgerConstructor.length === 0
      && !errorMessage)
        ? (
          <p className={'text text_type_main-medium'}>
            Перетащите ингредиенты и булки для составления бургера
          </p>)
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
          <div className={`text text_type_digits-medium ${s.burgerConstructor__price}`}>
            {checkTotalPrice([
              ...bunsForTheBurgerConstructor,
              ...ingredientsForTheBurgerConstructor,
              ...bunsForTheBurgerConstructor,
            ])}
          </div>
          <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          type="primary"
          size="large"
          disabled={
            bunsForTheBurgerConstructor.length === 0
            || ingredientsForTheBurgerConstructor.length === 0
            || isLoaderOrder
          }
          onClick={handleSendOrder}
          extraClass={`${isLoaderOrder && s.button}`}
        >
          {isLoaderOrder ? '' : 'Оформить заказ'}
        </Button>
      </div>
    </div>
  );
};

export default memo(BurgerConstructor);