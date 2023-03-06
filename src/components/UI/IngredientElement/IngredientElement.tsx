import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {FC} from 'react';

import { useDrag, useDrop } from 'react-dnd';

import { useAppDispatch } from '../../../hooks/useTypedSelector';
import { burgerConstructorActions } from '../../../services/slices/burgerConstructorSlice';
import { IIngredient } from '../../../types/interfaces/IIngredient';

import s from './IngredientElement.module.scss';


interface IngredientElementProps {
  item: IIngredient;
  index: number;
}

interface IIngredientDrop {
  item: IIngredient;
  index: number;
}

const IngredientElement: FC<IngredientElementProps> = ({item, index}) => {
  const dispatch = useAppDispatch();
  const [{isDrag, getItem}, refDrag] = useDrag({
    type: 'ingredientSort',
    item: {item, index},
    collect: monitor => ({
      isDrag: monitor.isDragging(),
      getItem: monitor.getItem(),
    }),
  });

  const [{isHover}, refDrop] = useDrop({
    accept: 'ingredientSort',
    drop(ingredientDrop: IIngredientDrop) {
      handleDrop(ingredientDrop);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
  });

  const handleDeleteIngredient = () => {
    dispatch(burgerConstructorActions.removeIngredientForTheBurgerConstructor(index));
  };

  const handleDrop = (ingredientDrop: IIngredientDrop) => {
    dispatch(burgerConstructorActions.sortIngredients({ingredientDrop, index}));
  };

  return (
    <li
      className={`pr-2 ${s.ingredientElement} ${isDrag && s.ingredientElement_dragging}`}
      ref={refDrag}
    >
      <div
        className={`${s.ingredientElement__flex} ${isHover && s.ingredientElement__flex_hover}`}
        ref={refDrop}
      >
        <DragIcon type="primary"/>
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          handleClose={handleDeleteIngredient}
        />
      </div>
    </li>);
};

export default IngredientElement;