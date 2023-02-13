import {FC} from 'react';

import { Route, Switch } from 'react-router-dom';

import Orders from '../../../components/Orders/Orders';

import OrderPage from './OrderPage/OrderPage';

interface IProfileOrdersProps {

}

const ProfileOrders: FC<IProfileOrdersProps> = () => {
  return (
    <Switch>
      <Route exact path='/profile/orders'>
        <Orders />
      </Route>
      <Route path={'/profile/orders/:orderId'}>
        <OrderPage />
      </Route>
    </Switch>
  );
};

export default ProfileOrders;