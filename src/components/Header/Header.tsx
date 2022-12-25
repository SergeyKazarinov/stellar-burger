import {FC} from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './Header.module.scss';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons'
import { Link } from 'react-router-dom';


export const Header: FC = () => {
  return (
    <header className={`${s.header}`}>
        <ul className={`list  ${s.header__container}`}>
          <li className={s.header__item}>
            <nav>
              <ul className={`list ${s.header__nav}`}>
                <li className={`pt-4 pb-4 pr-5 pl-5 mt-4 mb-4 ${s.header__listItem}`}>
                  <Link to='/' className={`link text text_type_main-default ${s.header__link}`}>
                    <BurgerIcon type="primary"/>
                    Конструктор
                  </Link>
                </li>
                <li className={`pt-4 pb-4 pr-5 pl-5 mt-4 mb-4 ${s.header__listItem}`}>
                  <Link to='/orders' className={`link text text_type_main-default ${s.header__link}`}>
                    <ListIcon type="secondary"/>
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
            <Link to='/profile' className={`link text text_type_main-default ${s.header__link}`}>
              <ProfileIcon type="secondary" />
              Личный кабинет
            </Link>
          </li>
        </ul>
    </header>
  )
}