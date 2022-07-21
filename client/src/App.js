import {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import setAuthToken from './utility/setAuthToken';
import Navbar from './components/layouts/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';
import {loadUser} from './actions/auth';
import {Provider} from 'react-redux';
import './App.css';
import PrivateRoute from './components/routing/PrivateRoute';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () =>{ 
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return(
  <Provider store={store}>
    <Router>
  <Fragment>
    <Navbar/>
    <section className='container'>
      <Switch>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
        {/* <PrivateRoute exact path='/dashboard' component={Dashboard}/> */}
        </Switch>
   </section>
  </Fragment>
  </Router>
  </Provider>
  
)}
  


export default App;
