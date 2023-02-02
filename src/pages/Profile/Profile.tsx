import React, {FC} from "react";
import profile from './Profile.module.scss'
import ProfileNavigation from "./ProfileNavigation/ProfileNavigation";
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import ProfileContainer from "./ProfileContainer/ProfileContainer";
import ProfileOrders from "./ProfileOrders/ProfileOrders";
import OrderPage from "./ProfileOrders/OrderPage/OrderPage";
import { URL_FOR_PROFILE_NAVIGATION } from "../../utils/constants";

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
}

export default Profile;