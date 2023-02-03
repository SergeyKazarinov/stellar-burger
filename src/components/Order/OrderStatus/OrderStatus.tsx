import {FC} from "react";
import s from './OrderStatus.module.scss';

interface IOrderStatusProps {

}

const OrderStatus: FC<IOrderStatusProps> = () => {
  return (
    <p className={`text text_type_main-default mt-2 ${s.status}`}>
      Готовится
    </p>
  );
}

export default OrderStatus;