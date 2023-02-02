import React, {FC} from "react";
import s from './Orders.module.scss';
import Order from "../Order/Order";

interface IOrdersProps {

}

const Orders: FC<IOrdersProps> = () => {
  return (
    <div className={`pr-2 ${s.orders}`}>
      <Order />
      <Order />
      <Order />
      <Order />
      <Order />
      <Order />
    </div>
  );
}

export default Orders;