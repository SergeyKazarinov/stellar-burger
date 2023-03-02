import React, {FC} from 'react';

import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { URL_FOR_PROFILE_NAVIGATION } from '../../utils/constants';

import profile from './Profile.module.scss';
import ProfileContainer from './ProfileContainer/ProfileContainer';
import ProfileNavigation from './ProfileNavigation/ProfileNavigation';
import ProfileOrders from './ProfileOrders/ProfileOrders';


interface IProfileProps {

}

const Profile: FC<IProfileProps> = () => {
  const { path } = useRouteMatch();

  return (
    <section className={`${profile.profile}`}>
      <Route exact path={URL_FOR_PROFILE_NAVIGATION} >
        <ProfileNavigation />
      </Route>

      <Switch>
        <Route exact path={`${path}`}>
          <ProfileContainer />
        </Route>
        <Route path={`${path}/orders`}>
          <ProfileOrders />
        </Route>
      </Switch>
    </section>
  );
};

export default Profile;