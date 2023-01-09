import React, {useEffect, useState} from "react";
import forgotPassword from './ResetPassword.module.scss';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { RouteComponentProps, withRouter } from "react-router";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const ResetPassword = ({history}: RouteComponentProps): JSX.Element => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  useEffect(() => {
    resetForm();
  }, [resetForm])

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
            onChange={handleChange}
            icon={isVisiblePassword ? 'HideIcon' : 'ShowIcon'}
            value={values.password}
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
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={handleChange}
            value={values.code}
            name={'code'}
            error={!!errors.code}
            errorText={errors.code}
            size={'default'}
            extraClass="mt-6"
            required
          />
          <Button
            htmlType="submit"
            type="primary"
            extraClass="mt-6"
            disabled={!isValid}
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