import { FC, useEffect, useMemo } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import Constructor from '../../pages/ConstructorPage/ConstructorPage';
import Feed from '../../pages/Feed/Feed';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import IngredientPage from '../../pages/IngredientPage/IngredientPage';
import Login from '../../pages/Login/Login';
import OrderDetailsPage from '../../pages/OrderDetailsPage/OrderDetailsPage';
import Profile from '../../pages/Profile/Profile';
import Register from '../../pages/Register/Register';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import { fetchIngredients } from '../../services/asyncThunk/ingredientsThunk';
import { fetchGetUser } from '../../services/asyncThunk/profileThunk';
import { Location, TLocationState } from '../../types/types/types';
import { Header } from '../Header/Header';
import OrderDetails from '../OrderDetails/OrderDetails';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import IngredientDetails from '../UI/Modal/IngredientDetails/IngredientDetails';
import Modal from '../UI/Modal/Modal';
import ModalWithMessage from '../UI/Modal/ModalWithMessage/ModalWithMessage';
import ModalWithOrder from '../UI/Modal/ModalWithOrder/ModalWithOrder';

const App: FC = () => {
  const {
    isOpenIngredientDetail,
    isOpenModalWithOrder,
    isOpenModalWithMessage,
    isOpenModalWithOrderDetails,
  } = useAppSelector((store) => store.modal);
  const { ingredients, fetchIngredientsPending } = useAppSelector((store) => store.ingredients);
  const ingredient = useAppSelector((store) => store.modal.ingredient);
  const order = useAppSelector(store => store.modal.order);
  const dispatch = useAppDispatch();
  const location = useLocation<TLocationState>();
  const background = isOpenIngredientDetail ? location.state.from : null;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchGetUser());
  }, []);

  return (
    <>
      <Header />
      <main>
        <Switch location={background as Location || location}>
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
            <OrderDetailsPage />
          </Route>
          <Route path='/ingredients/:id' >
            <IngredientPage />
          </Route>
        </Switch>
      </main>

      {isOpenIngredientDetail && (
        <Modal>
          <IngredientDetails ingredient={ingredient}/>
        </Modal>)}

      {isOpenModalWithOrder && (
        <Modal>
          <ModalWithOrder />
        </Modal>)}

      {isOpenModalWithOrderDetails && (
        <Modal>
          <OrderDetails order={order}/>
        </Modal>)}

      {isOpenModalWithMessage && (
        <Modal>
          <ModalWithMessage message={isOpenModalWithMessage} />
        </Modal>
      )}
    </>
  );
};

export default App;
