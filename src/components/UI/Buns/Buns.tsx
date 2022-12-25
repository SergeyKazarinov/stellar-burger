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
    <div className={s.buns}>
      <ul className={`list ${s.buns__list}`}>
        <li className='ml-8 pr-4'><BunItem type='top' title='верх' ingredient={buns[0]} /></li>
        {children}
        <li className='ml-8 pr-4'><BunItem type='bottom' title='низ' ingredient={buns[0]}/></li>
      </ul>


      <div className={`mt-10 pr-4 ${s.buns__total}`}>
        <div className={s.buns__flex}>
          <div className={`text text_type_digits-medium ${s.buns__price}`}>610</div>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

export default Buns;