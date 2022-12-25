import React, {FC} from 'react';
import s from './BunItem.module.scss';
import { CurrencyIcon, LockIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../../../utils/data';
import { IData } from '../../../../types/interface/IData';

interface IBunItemProps {
  type: string;
  title: string;
  ingregient: IData;
}

const BunItem: FC<IBunItemProps> = ({type, title, ingregient}) => {


  return (
    <div className={`pl-6 pt-4 pr-8 pb-4 ${s[`bunItem_type_${type}`]} ${s.bunItem}`}>
      <img className={s.bunItem__image} src={ingregient.image} alt={ingregient.name} />
      <p className={`text text_type_main-default`}>{ingregient.name} ({title})</p>
      <p className={`text text_type_digits-default`}>{ingregient.price}</p>
      <CurrencyIcon type="primary" />
      <LockIcon type="secondary" />
    </div>
  )
}

export default BunItem;