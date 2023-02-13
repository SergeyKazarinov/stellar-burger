import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {FormEvent, useEffect, useState} from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';

import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { fetchLogin } from '../../services/asyncThunk/profileThunk';
import { TLocation } from '../../types/types/TLocation';
import { EMAIL_PATTERN } from '../../utils/constants';

import login from './Login.module.scss';



const Login = ({history}: RouteComponentProps): JSX.Element => {
  const isLogin = useAppSelector(store => store.profile.isLogin);
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const dispatch = useAppDispatch();
  const { state } = history.location as TLocation;

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const onIconClick = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const handleMoveToRegister = () => {
    history.push('/register');
  };

  const handleMoveToForgotPassword = () => {
    history.push('/forgot-password');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(fetchLogin({
      email: values.email,
      password: values.password,
    }));
  };

  if (isLogin) {
    return (
      <Redirect to={ state?.from || '/' } />
    );
  }

  return (
    <section className={login.login}>
      <div className={login.container}>
        <h2 className={`text text_type_main-medium ${login.title}`}>Вход</h2>
        <form className={login.form} onSubmit={handleSubmit}>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleChange}
            value={values.email || ''}
            name={'email'}
            error={!!errors.email}
            errorText={errors.email}
            size={'default'}
            extraClass="mt-6"
            pattern={EMAIL_PATTERN}
            required
          />
          <Input
            type={isVisiblePassword ? 'text' : 'password'}
            placeholder={'Пароль'}
            onChange={handleChange}
            icon={isVisiblePassword ? 'HideIcon' : 'ShowIcon'}
            value={values.password || ''}
            name={'password'}
            error={!!errors.password}
            onIconClick={onIconClick}
            errorText={errors.password}
            size={'default'}
            extraClass="mt-6"
            minLength={8}
            maxLength={20}
            required
          />
          <Button
            htmlType="submit"
            type="primary"
            extraClass="mt-6"
            disabled={!isValid}
          >
            Войти
          </Button>
        </form>
        <p className={'mt-20 text text_type_main-default text_color_inactive'}>
          Вы — новый пользователь?&#8194;
          <Button htmlType="button" type="secondary" size="medium" extraClass={login.button} onClick={handleMoveToRegister}>
            Зарегистрироваться
          </Button>
        </p>
        <p className={'mt-4 text text_type_main-default text_color_inactive'}>
          Забыли пароль?&#8194;
          <Button htmlType="button" type="secondary" size="medium" extraClass={login.button} onClick={handleMoveToForgotPassword}>
            Восстановить пароль
          </Button>
        </p>
      </div>
    </section>
  );
};

export default withRouter(Login);