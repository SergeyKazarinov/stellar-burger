import {FC, useState} from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"

const Tabs: FC = () => {
  const [current, setCurrent] = useState('Булки')

  const handleClick = (value: string) => {
    setCurrent(value);
  }

  return (
    <div style={{ display: 'flex' }}>
      <Tab value="Булки" active={current === 'Булки'} onClick={handleClick}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={handleClick}>
        Соусы
      </Tab>
      <a href="#main" >
      <Tab value="Начинки" active={current === 'Начинки'} onClick={handleClick}>
        Начинки
      </Tab>
      </a>
    </div>
  )
}

export default Tabs;