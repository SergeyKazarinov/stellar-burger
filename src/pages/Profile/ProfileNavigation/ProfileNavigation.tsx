import React, {FC} from "react";
import profile from './ProfileNavigation.module.scss';
import { NavLink, useRouteMatch } from "react-router-dom";

interface IProfileNavigationProps {

}

const ProfileNavigation: FC<IProfileNavigationProps> = () => {
  const { url } = useRouteMatch();

  return (
    <div className={profile.navContainer}>
      <nav className={`text text_type_main-medium ${profile.navigation}`}>
        <NavLink
          to={url}
          exact={true}
          className={`link text_color_inactive ${profile.link}`}
          activeClassName={profile.link_active}
        >
          Профиль
        </NavLink>
        <NavLink
          to={`${url}/orders`}
          className={`link text_color_inactive ${profile.link}`}
          activeClassName={profile.link_active}
        >
          История заказов
        </NavLink>
      </nav>
      <button type='button' className={`button text_type_main-medium text_color_inactive ${profile.link}`}>Выход</button>
      <p className={`mt-20 text text_type_main-default text_color_inactive ${profile.description}`}>
        В этом разделе вы можете изменить&#160;свои персональные данные
      </p>
    </div>
  );
}

export default ProfileNavigation;