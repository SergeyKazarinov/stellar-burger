import React, {FC} from 'react';
import s from './IngredientDetails.module.scss';
import { IData } from '../../../../types/interface/IData';
import { data } from '../../../../utils/data';
import { useAppSelector } from '../../../../hooks/useTypedSelector';

interface IIngredientDetailsProps {
  ingredient: IData;
}

const IngredientDetails: FC = () => {
  const { ingredient } = useAppSelector(store => store.modal)

  return (
    <>
      <img className={s.image} src={ingredient.image} alt="Изображение ингридиента"/>
      <p className={`mt-4 text text_type_main-medium ${s.subtitle}`}>{ingredient.name}</p>
      <ul className={`pb-5 list mt-8 text text_type_main-default text_color_inactive ${s.flex}`}>
        <li className={s.flex__item}>
          <p className={`text text_type_main-default text_color_inactive`}>Калории,ккал</p>
          <p className={`text text_type_digits-default`}>{ingredient.calories}</p>
        </li>
        <li className={s.flex__item}>
          <p className={`text text_type_main-default text_color_inactive`}>Белки, г</p>
          <p className={`text text_type_digits-default`}>{ingredient.proteins}</p>
        </li>
        <li className={s.flex__item}>
          <p className={`text text_type_main-default text_color_inactive`}>Жиры, г</p>
          <p className={`text text_type_digits-default`}>{ingredient.fat}</p>
        </li>
        <li className={s.flex__item}>
          <p className={`text text_type_main-default text_color_inactive`}>Углеводы, г</p>
          <p className={`text text_type_digits-default`}>{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </>
  );
};

export default IngredientDetails;
