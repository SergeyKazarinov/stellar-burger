import {FC, useEffect, useMemo} from 'react';

import { Route, Switch } from 'react-router-dom';

import Order from '../../../components/Order/Order';
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
      <Route path={'/profile/orders/:orderId'}>
        <OrderDetailsPage />
      </Route>
    </Switch>
  );
};

export default ProfileOrders;