import {FC} from "react";
import Orders from "../../../components/Orders/Orders";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Order from "../../../components/Order/Order";
import OrderPage from "./OrderPage/OrderPage";

interface IProfileOrdersProps {

}

const ProfileOrders: FC<IProfileOrdersProps> = () => {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route exact path='/profile/orders'>
        <Orders />
      </Route>
      <Route path={`/profile/orders/:orderId`}>
        <OrderPage />
      </Route>
    </Switch>
  );
}

export default ProfileOrders;