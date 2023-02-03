import {FC} from "react";
import s from './OrderIngredientItem.module.scss'
import FeedIngredientOrder from "../UI/FeedIngredientOrder/FeedIngredientOrder";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IOrderIngredientItemProps {

}

const OrderIngredientItem: FC<IOrderIngredientItemProps> = () => {
  const ingredients = useAppSelector(store => store.ingredients.ingredients)

  return (
    <div className={s.item}>
      <FeedIngredientOrder item={ingredients[0]}/>
      <p className={`text text_type_main-default ${s.title}`}>Флюоресцентная булка R2-D3</p>
      <div className={s.price}>
        <p className={`text text_type_digits-default`}>2&#160;x&#160;20</p>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  );
}

export default OrderIngredientItem;