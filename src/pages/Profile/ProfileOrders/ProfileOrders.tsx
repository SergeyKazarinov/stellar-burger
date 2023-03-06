import {FC, useEffect} from 'react';

import { Route, Switch } from 'react-router-dom';

import Orders from '../../../components/Orders/Orders';
import ProtectedRoute from '../../../components/ProtectedRoute/ProtectedRoute';
import Loader from '../../../components/UI/Loader/Loader';
import { useAppSelector } from '../../../hooks/useTypedSelector';
import { useWebSocket } from '../../../hooks/useWebSocket';
import { WSS_FOR_PROFILE_ORDERS } from '../../../utils/constants';
import OrderDetailsPage from '../../OrderDetailsPage/OrderDetailsPage';

const ProfileOrders: FC = () => {
  const { connect, closeWs } = useWebSocket();
  const feedOrders = useAppSelector(store => store.wsReducers.wsMessage?.orders);
  const accessToken = useAppSelector(store => store.profile.accessToken);

  useEffect(() => {
    connect(`${WSS_FOR_PROFILE_ORDERS}?token=${accessToken?.replace('Bearer ', '')}`);

    return () => {
      closeWs();
    };
  }, [accessToken]);

  return (
    <Switch>
      <Route exact path='/profile/orders'>
        {feedOrders ? <Orders feedOrders={[...feedOrders].reverse()}/> : <Loader />}
      </Route>
      <ProtectedRoute path={'/profile/orders/:orderId'}>
        <OrderDetailsPage />
      </ProtectedRoute>
    </Switch>
  );
};

export default ProfileOrders;