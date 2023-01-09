import React, {useState} from "react";
import register from './Register.module.scss';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { RouteComponentProps, withRouter } from "react-router";

const Register = ({history}: RouteComponentProps): JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const onIconClick = () => {
    setIsVisiblePassword(!isVisiblePassword)
  }

  const handleMoveToLogin = () => {
    history.push('/login')
  }

  return (
    <section className={register.register}>
      <div className={register.container}>
        <h2 className={`text text_type_main-large ${register.title}`}>Регистрация</h2>
        <form className={register.form}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setName(e.target.value)}
            value={name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mt-6"
          />
          <Input
            type={'text'}
            placeholder={'E-mail'}
            onChange={e => setEmail(e.target.value)}
            value={email}
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
            Зарегистрироваться
          </Button>
        </form>
        <p className={`mt-20 text text_type_main-default text_color_inactive`}>
          Уже зарегистрированы?&#8194;
          <Button htmlType="button" type="secondary" size="medium" extraClass={register.button} onClick={handleMoveToLogin}>
            Войти
          </Button>
        </p>
      </div>
    </section>
  );
}

export default withRouter(Register);