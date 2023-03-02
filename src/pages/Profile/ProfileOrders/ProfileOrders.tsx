import {FC, useEffect, useMemo} from 'react';

import { Route, Switch } from 'react-router-dom';

import Orders from '../../../components/Orders/Orders';
import Loader from '../../../components/UI/Loader/Loader';
import { useAppSelector } from '../../../hooks/useTypedSelector';
import { useWebSocket } from '../../../hooks/useWebSocket';
import { ACCESS_TOKEN, WSS_FOR_PROFILE_ORDERS } from '../../../utils/constants';
import OrderDetailsPage from '../../OrderDetailsPage/OrderDetailsPage';

interface IProfileOrdersProps {

}

const ProfileOrders: FC<IProfileOrdersProps> = () => {
  const { connect, closeWs } = useWebSocket();
  const orders = useAppSelector(store => store.wsReducers.wsMessage);
  const accessToken = useMemo(() => localStorage.getItem(ACCESS_TOKEN)?.replace('Bearer ', ''), [localStorage.getItem(ACCESS_TOKEN)]);

  useEffect(() => {
    connect(`${WSS_FOR_PROFILE_ORDERS}?token=${accessToken}`);

    return () => {
      closeWs();
    };
  }, []);

  return (
    <Switch>
      <Route exact path='/profile/orders'>
        {orders ? <Orders /> : <Loader />}
      </Route>
      <Route path={'/profile/orders/:orderId'}>
        <OrderDetailsPage />
      </Route>
    </Switch>
  );
};

export default ProfileOrders;