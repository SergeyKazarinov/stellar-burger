import React, {FC, useState} from "react";
import login from './Login.module.scss';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

interface ILoginProps {

}

const Login: FC<ILoginProps> = () => {
  const [value, setValue] = React.useState('');
  const [password, setPassword] = useState('');
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const onIconClick = () => {
    setIsVisiblePassword(!isVisiblePassword)
  }

  return (
    <section className={login.login}>
      <div className={login.container}>
        <h2 className={`text text_type_main-large ${login.title}`}>Вход</h2>
        <form className={login.form}>
          <Input
            type={'text'}
            placeholder={'E-mail'}
            onChange={e => setValue(e.target.value)}
            value={value}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mt-6"
          />
          <Input
            type={isVisiblePassword ? 'text' : 'password'}
            placeholder={'Пароль'}
            onChange={e => setPassword(e.target.value)}
            icon={isVisiblePassword ? 'HideIcon' : 'ShowIcon'}
            value={password}
            name={'email'}
            error={false}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mt-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            extraClass="mt-6"
          >
            Войти
          </Button>
        </form>
        <p className={`mt-20 text text_type_main-default text_color_inactive`}>
          Вы — новый пользователь?&#8194;
          <Button htmlType="button" type="secondary" size="medium" extraClass={login.button}>
            Зарегистрироваться
          </Button>
        </p>
        <p className={`mt-4 text text_type_main-default text_color_inactive`}>
          Забыли пароль?&#8194;
          <Button htmlType="button" type="secondary" size="medium" extraClass={login.button}>
            Восстановить пароль
          </Button>
        </p>
      </div>
    </section>
  );
}

export default Login;