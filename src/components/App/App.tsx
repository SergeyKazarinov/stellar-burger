import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from '../Header/Header';
import Constructor from '../../pages/ConstructorPage/ConstructorPage';
import Modal from '../UI/Modal/Modal';
import IngredientDetails from '../UI/Modal/IngredientDetails/IngredientDetails';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import OrderDetails from '../UI/Modal/OrderDetails/OrderDetails';
import { fetchIngredients } from '../../services/asyncThunk/ingredientsThunk';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import Profile from '../../pages/Profile/Profile';
import Feed from '../../pages/Feed/Feed';
import OrderPage from '../../pages/Profile/ProfileOrders/OrderPage/OrderPage';
import { fetchGetUser } from '../../services/asyncThunk/profileThunk';
import ModalWithMessage from '../UI/Modal/ModalWithMessage/ModalWithMessage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const { isOpenIngredientDetail, isOpenOrderDetails, isOpenModalWithMessage} = useAppSelector(store => store.modal);
  const { ingredients, fetchIngredientsPending } = useAppSelector(store => store.ingredients);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchGetUser());
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
        <ProtectedRoute path='/profile'>
          <Profile />
        </ProtectedRoute>
        <Route exact path='/feed'>
          <Feed />
        </Route>
        <Route path='/feed/:orderId'>
          <OrderPage />
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

      {isOpenModalWithMessage && (
        <Modal>
          <ModalWithMessage message={isOpenModalWithMessage} />
        </Modal>
      )}
    </>
  );
}

export default App;
