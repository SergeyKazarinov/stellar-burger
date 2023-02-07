import React, {ChangeEvent, FC, FormEvent, MutableRefObject, useEffect, useState} from "react";
import profile from './ProfileContainer.module.scss';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelector";
import { fetchGetUser } from "../../../services/asyncThunk/profileThunk";

interface IProfileContainerProps {

}

const ProfileContainer: FC<IProfileContainerProps> = () => {
  const dispatch = useAppDispatch();
  const email = useAppSelector(store => store.profile.email);
  const name = useAppSelector(store => store.profile.name);
  const [value, setValue] = useState({name, email, password: ''});
  const [isEdit, setIsEdit] = useState({name: true, email: true, password: true});
  const inputNameRef: MutableRefObject<HTMLInputElement | null> = React.useRef(null);
  const inputLoginRef: MutableRefObject<HTMLInputElement | null> = React.useRef(null);
  const inputPasswordRef: MutableRefObject<HTMLInputElement | null> = React.useRef(null);

  useEffect(() => {
    dispatch(fetchGetUser())
  }, [])

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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({...value, [e.target.name]: e.target.value})
  }

  const handleBlur = () => {
    setIsEdit({name: true, email: true, password: true})
  }


  return (
    <div className={profile.profileContainer}>
      <Input
        type={'text'}
        id={'name'}
        placeholder={'Имя'}
        onChange={onChange}
        icon={'EditIcon'}
        value={value.name}
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
        onChange={onChange}
        icon={'EditIcon'}
        value={value.email}
        name={'email'}
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
        onChange={onChange}
        icon={'EditIcon'}
        value={value.password}
        name={'password'}
        error={false}
        onIconClick={onIconPasswordClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mt-6"
        ref={inputPasswordRef}
        readOnly={isEdit.password}
        onBlur={handleBlur}
      />
  </div>
    );
}

export default ProfileContainer;