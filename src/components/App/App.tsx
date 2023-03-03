import { FC, useEffect } from 'react';
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
import Loader from '../UI/Loader/Loader';
import IngredientDetails from '../UI/Modal/IngredientDetails/IngredientDetails';
import Modal from '../UI/Modal/Modal';
import ModalWithMessage from '../UI/Modal/ModalWithMessage/ModalWithMessage';
import ModalWithOrder from '../UI/Modal/ModalWithOrder/ModalWithOrder';

const App: FC = () => {
  const {
    ingredientForModal,
    isOpenModalWithMessage,
  } = useAppSelector((store) => store.modal);
  const order = useAppSelector(store => store.burgerConstructor.order);
  const isLoaderPage = useAppSelector(store => store.profile.isLoaderPage);
  const { ingredients, fetchIngredientsPending } = useAppSelector((store) => store.ingredients);
  const orderForModal = useAppSelector(store => store.modal.orderForModal);
  const dispatch = useAppDispatch();
  const location = useLocation<TLocationState>();
  const background = ingredientForModal || orderForModal ? location.state.background : null;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchGetUser());
  }, []);

  return (
    isLoaderPage
      ? <Loader />
      : <>
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

        {ingredientForModal && (
          <Modal>
            <IngredientDetails ingredient={ingredientForModal}/>
          </Modal>)}

        {order && (
          <Modal>
            <ModalWithOrder />
          </Modal>)}

        {orderForModal && (
          <Modal>
            <OrderDetails order={orderForModal!}/>
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
