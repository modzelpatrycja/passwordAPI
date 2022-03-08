import './App.css';
import { Home } from './Home';
import { Password } from './Password';
import LoginPanel from './LoginPanel';
import Register from './Register';
import {PassVerification} from './PassVerification';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter forceRefresh={true}>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/password' component={Password} />
          <Route path='/verify' component={PassVerification} />
          <Route path='/' component={LoginPanel} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
