import React, {useState} from "react";
import forgotPassword from './ForgotPassword.module.scss';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { RouteComponentProps, withRouter } from "react-router";

const ForgotPassword = ({history}: RouteComponentProps): JSX.Element => {
  const [email, setEmail] = useState('');

  const handleMoveToLogin = () => {
    history.push('/login')
  }

  return (
    <section className={forgotPassword.forgotPassword}>
      <div className={forgotPassword.container}>
        <h2 className={`text text_type_main-medium ${forgotPassword.title}`}>Восстановление пароля</h2>
        <form className={forgotPassword.form}>
          <Input
            type={'text'}
            placeholder={'Укажите e-mail'}
            onChange={e => setEmail(e.target.value)}
            value={email}
            name={'email'}
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
            Восстановить
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

export default withRouter(ForgotPassword);