import {FC} from 'react';
import s from './ConstructorPage.module.scss';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";

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
  )
}

export default Constructor;