import {FC, useState, useEffect, memo, useCallback} from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import { useAppSelector } from '../../../hooks/useTypedSelector';
import { BUNS, SAUCES, TOPPINGS } from '../../../utils/constants';

const Tabs: FC = () => {
  const [current, setCurrent] = useState<string>(BUNS)
  const scrollValue = useAppSelector(state => state.scroll.scrollValue);

  useEffect(() => {
    scrollValue <= 290
    ? setCurrent(BUNS)
    : scrollValue <= 820
    ? setCurrent(SAUCES)
    : setCurrent(TOPPINGS)
  }, [scrollValue])

  const handleClick = useCallback((value: string) => {
    setCurrent(value);
  }, [current]);

  return (
    <div style={{ display: 'flex' }}>
      <a href="#buns" className='link'>
        <Tab value={BUNS} active={current === BUNS} onClick={handleClick}>
          Булки
        </Tab>
      </a>
      <a href="#sauces" className='link'>
        <Tab value={SAUCES} active={current === SAUCES} onClick={handleClick}>
          Соусы
        </Tab>
      </a>
      <a href="#mains" className='link'>
        <Tab value={TOPPINGS} active={current === TOPPINGS} onClick={handleClick}>
          Начинки
        </Tab>
      </a>
    </div>
  )
}

export default memo(Tabs);