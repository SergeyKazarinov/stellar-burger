import React, {FormEvent, useEffect, useState} from "react";
import forgotPassword from './ForgotPassword.module.scss';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import { EMAIL_PATTERN } from "../../utils/constants";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { fetchForgotPassword } from "../../services/asyncThunk/profileThunk";
import { modalActions } from "../../services/slices/portalSlice";
import { profileActions } from "../../services/slices/profileSlice";

const ForgotPassword = ({history}: RouteComponentProps): JSX.Element => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const dispatch = useAppDispatch();
  const message = useAppSelector(store => store.profile.message);
  const isLogin = useAppSelector(store => store.profile.isLogin);

  useEffect(() => {
    resetForm();
  }, [resetForm])

  const handleMoveToLogin = () => {
    history.push('/login')
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchForgotPassword(values.email));
  };

  useEffect(() => {
    if(message) {
      console.log(message)
      dispatch(modalActions.setIsOpenModalWithMessage(message));
      history.push('/reset-password');
      dispatch(profileActions.setMessage(''));
    }
  }, [message])

  if(isLogin) {
    <Redirect to={{pathname: '/'}} />;
  }
  return (
    <section className={forgotPassword.forgotPassword}>
      <div className={forgotPassword.container}>
        <h2 className={`text text_type_main-medium ${forgotPassword.title}`}>Восстановление пароля</h2>
        <form className={forgotPassword.form} onSubmit={handleSubmit}>
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