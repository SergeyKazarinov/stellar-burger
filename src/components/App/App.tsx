import { Route, Switch } from 'react-router-dom';
import { Header } from '../Header/Header';
import Constructor from '../../pages/constructor-page/constructor-page';
import Modal from '../UI/Modal/Modal';
import ModalWithOrder from '../UI/Modal/ModalWithOrder/ModalWithOrder';
import { useState } from 'react';

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
    <Header />
    <Switch>
      <Route exact path='/'>
        <Constructor onClick={() => setIsOpenModal(true)}/>
      </Route>
    </Switch>
    {isOpenModal && (<Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
      <ModalWithOrder />
    </Modal>)}

    </>
  );
}

export default App;
