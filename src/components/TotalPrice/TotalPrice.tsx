import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {FC} from "react";
import s from './TotalPrice.module.scss';

interface ITotalPriceProps {
  totalPrice: number;
}

const TotalPrice: FC<ITotalPriceProps> = ({ totalPrice }) => {
  return (
    <div className={s.flexContainer}>
      <div className={`text text_type_digits-default ${s.burgerConstructor__price}`}>{totalPrice}</div>
      <CurrencyIcon type="primary" />
    </div>
  );
}

export default TotalPrice;