import { Route, Switch } from 'react-router-dom';
import { Header } from '../Header/Header';
import Constructor from '../../pages/constructor-page/constructor-page';

function App() {
  return (
    <>
    <Header />
    <Switch>
      <Route exact path='/'>
        <Constructor />
      </Route>
    </Switch>
    </>
  );
}

export default App;
