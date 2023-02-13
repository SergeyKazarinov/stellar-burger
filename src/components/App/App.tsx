import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import Constructor from '../../pages/ConstructorPage/ConstructorPage';
import Feed from '../../pages/Feed/Feed';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import IngredientPage from '../../pages/IngredientPage/IngredientPage';
import Login from '../../pages/Login/Login';
import Profile from '../../pages/Profile/Profile';
import OrderPage from '../../pages/Profile/ProfileOrders/OrderPage/OrderPage';
import Register from '../../pages/Register/Register';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import { fetchIngredients } from '../../services/asyncThunk/ingredientsThunk';
import { fetchGetUser } from '../../services/asyncThunk/profileThunk';
import { Header } from '../Header/Header';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import IngredientDetails from '../UI/Modal/IngredientDetails/IngredientDetails';
import Modal from '../UI/Modal/Modal';
import ModalWithMessage from '../UI/Modal/ModalWithMessage/ModalWithMessage';
import OrderDetails from '../UI/Modal/OrderDetails/OrderDetails';

function App() {
  const {
    isOpenIngredientDetail,
    isOpenOrderDetails,
    isOpenModalWithMessage,
  } = useAppSelector((store) => store.modal);
  const { ingredients, fetchIngredientsPending } = useAppSelector(store => store.ingredients);
  const ingredient = useAppSelector(store => store.modal.ingredient);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchGetUser());
  }, []);

  return (
    <>
      <Header />
      <main>
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
          <Route path='/ingredients/:id'>
            <IngredientPage />
          </Route>
        </Switch>
      </main>

      {isOpenIngredientDetail && (
        <Modal>
          <IngredientDetails ingredient={ingredient}/>
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
