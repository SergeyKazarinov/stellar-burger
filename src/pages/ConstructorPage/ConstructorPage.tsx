import {FC, memo} from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';

import s from './ConstructorPage.module.scss';

interface IConstructorProps {

}
const Constructor: FC<IConstructorProps> = () => {
  return(
    <section className={`pb-10 ${s.constructorContainer}`}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor/>
      </DndProvider>
    </section>
  );
};

export default memo(Constructor);