import { Route, Switch } from 'react-router-dom';
import { Header } from '../Header/Header';

function App() {
  return (
    <>
    <Header />
    <Switch>
      <Route exact path='/'>
      </Route>
    </Switch>
    <div className='container'>
      <div className='item'></div>
      <div className='item'></div>
    </div>
    </>
  );
}

export default App;
