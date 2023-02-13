import {FC} from "react";
import s from './OrderStatus.module.scss';
import { IOrderStatus } from "../../../types/interfaces/IOrder";

interface IOrderStatusProps {
  orderStatus: IOrderStatus;
}

const OrderStatus: FC<IOrderStatusProps> = ({orderStatus}) => {
  return (
    <p className={`text text_type_main-default mt-2 ${s.status}`}>
      Готовится
    </p>
  );
}

export default OrderStatus;