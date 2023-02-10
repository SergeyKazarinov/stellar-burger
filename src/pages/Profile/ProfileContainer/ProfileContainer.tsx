import React, {ChangeEvent, FC, FormEvent, MutableRefObject, useEffect, useMemo, useState} from "react";
import s from './ProfileContainer.module.scss';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelector";
import { fetchGetUser, fetchUpdateUser } from "../../../services/asyncThunk/profileThunk";
import { useFormWithValidation } from "../../../hooks/useFormWithValidation";
import { EMAIL_PATTERN } from "../../../utils/constants";

interface IProfileContainerProps {

}

const ProfileContainer: FC<IProfileContainerProps> = () => {
  const dispatch = useAppDispatch();
  const email = useAppSelector(store => store.profile.email);
  const name = useAppSelector(store => store.profile.name);
  const {values, handleChange, errors, isValid, resetForm, setValues} = useFormWithValidation();
  const [isEdit, setIsEdit] = useState({name: true, email: true, password: true});
  const inputNameRef: MutableRefObject<HTMLInputElement | null> = React.useRef(null);
  const inputLoginRef: MutableRefObject<HTMLInputElement | null> = React.useRef(null);
  const inputPasswordRef: MutableRefObject<HTMLInputElement | null> = React.useRef(null);
  const sameValues = (name !== values.name || email !== values.email || values.password.length >= 8)
  const isButtonActive = useMemo(
    () => (
      isValid && sameValues
    ), [isValid, name, email, values]);

  useEffect(() => {
    dispatch(fetchGetUser())
  }, [])

  useEffect(() => {
    resetForm({name, email, password: ''})
  }, [resetForm])

  const onIconNameClick = () => {
    setIsEdit({...isEdit, name: false});
    inputNameRef.current!.focus();
  };

  const onIconLoginClick = () => {
    setIsEdit({...isEdit, email: false});
    inputLoginRef.current!.focus();
  };

  const onIconPasswordClick = () => {
    setIsEdit({...isEdit, password: false});
    inputPasswordRef.current!.focus();
  };

  const handleBlur = () => {
    setIsEdit({name: true, email: true, password: true});
    if (values.password.length < 8) {
      setValues({...values, password: ''})
    }
  }

  const handleResetValue = () => {
    resetForm({name, email, password: ''})
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (values.password.length < 8) {
      dispatch(fetchUpdateUser({name: values.name, email: values.email}))
    } else {
      dispatch(fetchUpdateUser({name: values.name, email: values.email, password: values.password}))
    }
  }


  return (
    <form className={s.profileContainer} onSubmit={handleSubmit}>
      <Input
        type={'text'}
        id={'name'}
        placeholder={'Имя'}
        onChange={handleChange}
        icon={'EditIcon'}
        value={values.name || ''}
        name={'name'}
        error={false}
        onIconClick={onIconNameClick}
        errorText={'Ошибка'}
        size={'default'}
        readOnly={isEdit.name}
        ref={inputNameRef}
        onBlur={handleBlur}
      />
      <Input
        type={'email'}
        placeholder={'Логин'}
        onChange={handleChange}
        icon={'EditIcon'}
        value={values.email || ''}
        name={'email'}
        pattern={EMAIL_PATTERN}
        error={false}
        onIconClick={onIconLoginClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mt-6"
        readOnly={isEdit.email}
        ref={inputLoginRef}
        onBlur={handleBlur}
      />
      <Input
        type={'password'}
        placeholder={'Пароль'}
        onChange={handleChange}
        icon={'EditIcon'}
        value={values.password || ''}
        name={'password'}
        error={false}
        onIconClick={onIconPasswordClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mt-6"
        ref={inputPasswordRef}
        readOnly={isEdit.password}
        minLength={8}
        maxLength={20}
        onBlur={handleBlur}
        required
      />
      {sameValues && <div className={`mt-10 ${s.buttonContainer}`}>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass={s.button}
          disabled={!isButtonActive}
        >
          Сохранить
        </Button>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass={s.button}
          onClick={handleResetValue}
        >
          Отмена
        </Button>
      </div>}
  </form>
    );
}

export default ProfileContainer;