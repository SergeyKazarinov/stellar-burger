import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import {FormEvent, useEffect} from 'react';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';

import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { fetchForgotPassword } from '../../services/asyncThunk/profileThunk';
import { modalActions } from '../../services/slices/portalSlice';
import { profileActions } from '../../services/slices/profileSlice';
import { EMAIL_PATTERN } from '../../utils/constants';

import s from './ForgotPassword.module.scss';

const ForgotPassword = ({history}: RouteComponentProps): JSX.Element => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const dispatch = useAppDispatch();
  const message = useAppSelector(store => store.profile.message);
  const isLogin = useAppSelector(store => store.profile.isLogin);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleMoveToLogin = () => {
    history.push('/login');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchForgotPassword(values.email));
  };

  // В настоящей реализации - костыль. Исправить
  useEffect(() => {
    if(message) {
      dispatch(modalActions.setIsOpenModalWithMessage(message));
      history.push('/reset-password');
      dispatch(profileActions.setMessage(''));
    }
  }, [message]);

  if (isLogin) {
    return (
      <Redirect to='/' />
    );
  }

  return (
    <section className={s.forgotPassword}>
      <div className={s.container}>
        <h2 className={`text text_type_main-medium ${s.title}`}>
          Восстановление пароля
        </h2>
        <form className={s.form} onSubmit={handleSubmit}>
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
          <Button
            htmlType="submit"
            type="primary"
            extraClass="mt-6"
            disabled={!isValid}
          >
            Восстановить
          </Button>
        </form>
        <p className={'mt-20 text text_type_main-default text_color_inactive'}>
          Вспомнили пароль?&#8194;
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={s.button}
            onClick={handleMoveToLogin}
          >
            Войти
          </Button>
        </p>
      </div>
    </section>
  );
};

export default withRouter(ForgotPassword);