import React, {FC} from "react";
import profile from './Profile.module.scss'
import ProfileNavigation from "./ProfileNavigation/ProfileNavigation";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProfileContainer from "./ProfileContainer/ProfileContainer";

interface IProfileProps {

}

const Profile: FC<IProfileProps> = () => {
  const { path } = useRouteMatch();

  return (
    <section className={`${profile.profile}`}>
      <ProfileNavigation />
      <Switch>
        <Route exact path={`${path}`}>
          <ProfileContainer />
        </Route>
        <Route path={`${path}/orders`}>
          sdf
        </Route>
      </Switch>

    </section>
  );
}

export default Profile;