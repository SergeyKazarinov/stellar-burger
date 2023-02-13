import React, { FC, memo, useMemo } from 'react';

import { useHistory, useParams } from 'react-router-dom';

import IngredientDetails from '../../components/UI/Modal/IngredientDetails/IngredientDetails';
import { useAppSelector } from '../../hooks/useTypedSelector';
import Constructor from '../ConstructorPage/ConstructorPage';

import s from './IngredientPage.module.scss';

interface IngredientPageProps {
}

const IngredientPage: FC<IngredientPageProps> = () => {
  const params: {id: string} = useParams();
  const ingredients = useAppSelector(store => store.ingredients.ingredients);
  const history = useHistory();

  const ingredient = useMemo(() => {
    return ingredients.find((item) => item._id === params.id);
  }, [params.id, ingredients]);


  return (
    history.action === 'POP'
      ? <section className={s.ingredientPage}>
        <h2 className={`text text_type_main-large ${s.title}`}>Детали ингредиента</h2>
        <IngredientDetails ingredient={ingredient} />
      </section>
      : <Constructor />
  );
};

export default memo(IngredientPage);