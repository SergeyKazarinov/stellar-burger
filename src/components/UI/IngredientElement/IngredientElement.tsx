import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC} from "react";
import s from './IngredientElement.module.scss';
import { IIngredient } from "../../../types/interfaces/IIngredient";
import { useAppDispatch } from "../../../hooks/useTypedSelector";
import { removeIngredientForTheBurgerConstructor, sortIngredients } from "../../../services/slices/burgerConstructorSlice";
import { useDrag, useDrop } from "react-dnd";

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
  const [{isDrag}, refDrag] = useDrag({
    type: 'ingredientSort',
    item: {item, index},
    collect: monitor => ({
      isDrag: monitor.isDragging(),
    })
  })

  const [{isHover}, refDrop] = useDrop({
    accept: 'ingredientSort',
    drop(ingredientDrop: IIngredientDrop) {
      handleDrop(ingredientDrop);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  })

  const handleDeleteIngredient = () => {
    dispatch(removeIngredientForTheBurgerConstructor(index))
  }

  const handleDrop = (ingredientDrop: IIngredientDrop) => {
    dispatch(sortIngredients({ingredientDrop, index}))
  }

  return (
    <li className={`pr-2 ${s.ingredientElement}`} ref={refDrag}>
      {!isDrag &&
      <div className={`${s.ingredientElement__flex} ${isHover && s.ingredientElement__flex_hover}`} ref={refDrop}>
        <DragIcon type="primary"/>
        <ConstructorElement
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          handleClose={handleDeleteIngredient}
        />
      </div>}
  </li>);
}

export default IngredientElement;