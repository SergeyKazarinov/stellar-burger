import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from '../Header/Header';
import Constructor from '../../pages/ConstructorPage/ConstructorPage';
import Modal from '../UI/Modal/Modal';
import IngredientDetails from '../UI/Modal/IngredientDetails/IngredientDetails';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import OrderDetails from '../UI/Modal/OrderDetails/OrderDetails';
import { fetchIngredients } from '../../services/asyncThunk/ingredients';
import Login from '../../pages/Login/Login';

function App() {
  const { isOpenIngredientDetail, isOpenOrderDetails} = useAppSelector(store => store.modal);
  const { ingredients, fetchIngredientsPending } = useAppSelector(store => store.ingredients);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [])

  return (
    <>
    <Header />
    <Switch>
      <Route exact path='/'>
        {ingredients.length > 0 && !fetchIngredientsPending && <Constructor />}
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
    </Switch>

    {isOpenIngredientDetail && (
    <Modal>
      <IngredientDetails />
    </Modal>)}

    {isOpenOrderDetails && (
    <Modal>
      <OrderDetails />
    </Modal>)}


    </>
  );
}

export default App;
