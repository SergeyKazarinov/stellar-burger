import { Route, Switch } from 'react-router-dom';
import { Header } from '../Header/Header';
import Constructor from '../../pages/constructor-page/constructor-page';
import Modal from '../UI/Modal/Modal';
import { useState } from 'react';
import IngredientDetails from '../UI/Modal/IngredientDetails/IngredientDetails';
import { useAppSelector } from '../../hooks/useTypedSelector';
import OrderDetails from '../UI/Modal/OrderDetails/OrderDetails';

function App() {
  const { isOpenIngredientDetail, isOpenOrderDetails} = useAppSelector(store => store.modal)

  return (
    <>
    <Header />
    <Switch>
      <Route exact path='/'>
        <Constructor />
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
