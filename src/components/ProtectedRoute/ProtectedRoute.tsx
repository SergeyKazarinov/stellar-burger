import React, {FC, ReactNode} from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router-dom';

import { useAppSelector } from '../../hooks/useTypedSelector';

interface ProtectedRouteProps {
  children: ReactNode;
  path: string
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({children, ...rest}) => {
  const isLogin = useAppSelector(store => store.profile.isLogin);
  return (
    <Route
      {...rest}
      render={({ location }: RouteComponentProps) => {
        return (isLogin
          ? children
          : <Redirect to={{ pathname: '/login', state: { background: location } }}/>);}
      }
    />
  );
};

export default ProtectedRoute;