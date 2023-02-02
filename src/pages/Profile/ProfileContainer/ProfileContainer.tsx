import React, {FC, useState} from "react";
import profile from './ProfileContainer.module.scss';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

interface IProfileContainerProps {

}

const ProfileContainer: FC<IProfileContainerProps> = () => {

  const [value, setValue] = React.useState('Марк');
  const [isEdit, setIsEdit] = useState(false);
  const onIconClick = () => {
    setIsEdit(!isEdit);
    console.log(isEdit)
  };


  return (
    <div className={profile.profileContainer}>
      <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={e => setValue(e.target.value)}
        icon={'EditIcon'}
        value={value}
        name={'name'}
        error={false}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        readOnly={true}
      />
      <Input
        type={'email'}
        placeholder={'Логин'}
        onChange={e => setValue(e.target.value)}
        icon={'EditIcon'}
        value={value}
        name={'email'}
        error={false}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mt-6"
      />
      <Input
        type={'password'}
        placeholder={'Пароль'}
        onChange={e => setValue(e.target.value)}
        icon={'EditIcon'}
        value={value}
        name={'password'}
        error={false}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="mt-6"
      />
  </div>
    );
}

export default ProfileContainer;