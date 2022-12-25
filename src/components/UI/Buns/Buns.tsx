import React, {FC} from 'react';
import s from './Buns.module.scss';
import BunItem from './BunItem/BunItem';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { data } from '../../../utils/data';

interface IBunsProps {
  children?: React.ReactNode;
}

const Buns: FC<IBunsProps> = ({children}) => {
  const buns = data.filter((item) => item.type === 'bun');


  return (
    <>
      <ul className={`list ml-8 ${s.buns}`}>
        <li><BunItem type='top' title='верх' ingregient={buns[0]} /></li>
        {children}
        <li><BunItem type='bottom' title='низ' ingregient={buns[0]}/></li>
      </ul>


      <div className={`mt-10 ${s.buns__total}`}>
        <div className={s.buns__flex}>
          <div className={`text text_type_digits-medium ${s.buns__price}`}>610</div>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </>
  )
}

export default Buns;