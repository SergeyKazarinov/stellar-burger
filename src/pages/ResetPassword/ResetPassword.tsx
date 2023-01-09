import React, {useState} from "react";
import forgotPassword from './ResetPassword.module.scss';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { RouteComponentProps, withRouter } from "react-router";

const ResetPassword = ({history}: RouteComponentProps): JSX.Element => {
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const onIconClick = () => {
    setIsVisiblePassword(!isVisiblePassword)
  }

  const handleMoveToLogin = () => {
    history.push('/login')
  }

  return (
    <section className={forgotPassword.forgotPassword}>
      <div className={forgotPassword.container}>
        <h2 className={`text text_type_main-medium ${forgotPassword.title}`}>Восстановление пароля</h2>
        <form className={forgotPassword.form}>
          <Input
            type={isVisiblePassword ? 'text' : 'password'}
            placeholder={'Введите новый пароль'}
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
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={e => setCode(e.target.value)}
            value={code}
            name={'code'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mt-6"
          />
          <Button
            htmlType="submit"
            type="primary"
            extraClass="mt-6"
          >
            Сохранить
          </Button>
        </form>
        <p className={`mt-20 text text_type_main-default text_color_inactive`}>
          Вспомнили пароль?&#8194;
          <Button htmlType="button" type="secondary" size="medium" extraClass={forgotPassword.button} onClick={handleMoveToLogin}>
            Войти
          </Button>
        </p>
      </div>
    </section>
  );
}

export default withRouter(ResetPassword);