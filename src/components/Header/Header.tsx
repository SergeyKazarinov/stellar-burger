import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';

import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import {FC} from 'react';
import { Link, useLocation } from 'react-router-dom';

import s from './Header.module.scss';


export const Header: FC = () => {
  const url = useLocation();

  return (
    <header className={`${s.header}`}>
      <ul className={`list  ${s.header__container}`}>
        <li className={s.header__item}>
          <nav>
            <ul className={`list ${s.header__nav}`}>
              <li className={`pt-4 pb-4 pr-5 pl-5 mt-4 mb-4 ${s.header__listItem}`}>
                <Link to='/' className={`link text text_type_main-default ${url.pathname !== '/' && 'text_color_inactive'} ${s.header__link}`}>
                  <BurgerIcon type={`${url.pathname === '/' ? 'primary' : 'secondary'}`}/>
                    Конструктор
                </Link>
              </li>
              <li className={`pt-4 pb-4 pr-5 pl-5 mt-4 mb-4 ${s.header__listItem}`}>
                <Link to='/feed' className={`link text text_type_main-default ${url.pathname !== '/feed' && 'text_color_inactive'} ${s.header__link}`}>
                  <ListIcon type={`${url.pathname === '/orders' ? 'primary' : 'secondary'}`}/>
                    Лента заказов
                </Link>
              </li>
            </ul>
          </nav>
        </li>
        <li className={s.header__logo}>
          <Logo />
        </li>
        <li className={`pt-4 pb-4 pr-5 pl-5 mt-4 mb-4 ${s.header__listItem}`}>
          <Link to='/profile' className={`link text text_type_main-default ${!url.pathname.includes('/profile') && 'text_color_inactive'} ${s.header__link}`}>
            <ProfileIcon type={`${url.pathname.includes('/profile') ? 'primary' : 'secondary'}`} />
              Личный кабинет
          </Link>
        </li>
      </ul>
    </header>
  );
};