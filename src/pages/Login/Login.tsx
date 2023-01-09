import React, {useState} from "react";
import login from './Login.module.scss';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { RouteComponentProps, withRouter } from "react-router";

const Login = ({history}: RouteComponentProps): JSX.Element => {
  const [value, setValue] = React.useState('');
  const [password, setPassword] = useState('');
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const onIconClick = () => {
    setIsVisiblePassword(!isVisiblePassword)
  }

  const handleMoveToRegister = () => {
    history.push('/register')
  }

  const handleMoveToForgotPassword = () => {
    history.push('/forgot-password')
  }

  return (
    <section className={login.login}>
      <div className={login.container}>
        <h2 className={`text text_type_main-medium ${login.title}`}>Вход</h2>
        <form className={login.form}>
          <Input
            type={'email'}
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
            name={'password'}
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
          <Button htmlType="button" type="secondary" size="medium" extraClass={login.button} onClick={handleMoveToRegister}>
            Зарегистрироваться
          </Button>
        </p>
        <p className={`mt-4 text text_type_main-default text_color_inactive`}>
          Забыли пароль?&#8194;
          <Button htmlType="button" type="secondary" size="medium" extraClass={login.button} onClick={handleMoveToForgotPassword}>
            Восстановить пароль
          </Button>
        </p>
      </div>
    </section>
  );
}

export default withRouter(Login);