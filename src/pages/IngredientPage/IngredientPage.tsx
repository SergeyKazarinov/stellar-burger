import { FC, memo, useMemo } from 'react';

import { useParams } from 'react-router-dom';

import IngredientDetails from '../../components/UI/Modal/IngredientDetails/IngredientDetails';
import { useAppSelector } from '../../hooks/useTypedSelector';

import PageNotFound from '../PageNotFound/PageNotFound';

import s from './IngredientPage.module.scss';

const IngredientPage: FC = () => {
  const params: {id: string} = useParams();
  const ingredients = useAppSelector(store => store.ingredients.ingredients);

  const ingredient = useMemo(() => {
    return ingredients.find((item) => item._id === params.id);
  }, [params.id, ingredients]);

  return (
    ingredient
      ? <section className={s.ingredientPage}>
        <h2 className={`text text_type_main-large ${s.title}`}>Детали ингредиента</h2>
        <IngredientDetails ingredient={ingredient} />
      </section>
      : <PageNotFound />
  );
};

export default memo(IngredientPage);