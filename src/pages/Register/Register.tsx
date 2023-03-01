import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {FormEvent, useEffect, useState} from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';

import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { fetchRegister } from '../../services/asyncThunk/profileThunk';
import { TLocation } from '../../types/types/types';
import { EMAIL_PATTERN } from '../../utils/constants';

import register from './Register.module.scss';

const Register = ({history}: RouteComponentProps): JSX.Element => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(store => store.profile.isLogin);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const { state } = history.location as TLocation;

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const onIconClick = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const handleMoveToLogin = () => {
    history.push('/login');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(fetchRegister({
      email: values.email,
      password: values.password,
      name: values.name,
    }));
  };

  if (isLogin) {
    return (
      <Redirect to={ state?.background || '/' } />
    );
  }

  return (
    <section className={register.register}>
      <div className={register.container}>
        <h2 className={`text text_type_main-medium ${register.title}`}>Регистрация</h2>
        <form className={register.form} onSubmit={handleSubmit}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleChange}
            value={values.name || ''}
            name={'name'}
            error={!!errors.name}
            errorText={errors.name}
            size={'default'}
            extraClass="mt-6"
            minLength={2}
            maxLength={20}
            required
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleChange}
            value={values.email  || ''}
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
            value={values.password  || ''}
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
            Зарегистрироваться
          </Button>
        </form>
        <p className={'mt-20 text text_type_main-default text_color_inactive'}>
          Уже зарегистрированы?&#8194;
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={register.button}
            onClick={handleMoveToLogin}
          >
            Войти
          </Button>
        </p>
      </div>
    </section>
  );
};

export default withRouter(Register);