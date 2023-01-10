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
import Register from '../../pages/Register/Register';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';

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
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/forgot-password'>
        <ForgotPassword />
      </Route>
      <Route path='/reset-password'>
        <ResetPassword />
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
