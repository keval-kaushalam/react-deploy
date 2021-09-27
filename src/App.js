import React, {Suspense} from 'react';
// import SignUp from './components/SignUp';
// import SignIn from './components/SignIn';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import NavBar from './components/NavBar';
import { CssBaseline } from '@mui/material';
import axios from 'axios';
import MasterLayout from './layouts/admin/MasterLayout';

const SignUp = React.lazy(() => import('./components/SignUp'));
const SignIn = React.lazy(() => import('./components/SignIn'));

function App() {

  axios.defaults.withCredentials = true;

  axios.interceptors.request.use(function (config){
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  })

  let redirectToUrl = "";
  if (!localStorage.getItem('auth_token'))
  {
    redirectToUrl = <Redirect to="/signin"/>;
  }else{
    // redirectToUrl = <Redirect to="/admin/dashboard"/>;
  }

  return (
    <>
      <Router>
        {redirectToUrl}
        <Switch>
          <Route path="/" exact component={NavBar} />

          <Route path="/admin" name="Admin" render={(props)=> <MasterLayout {...props}/> } />

          <Suspense fallback={<div>Loading.......</div>}>
            <Route path="/signup" exact component={SignUp} />
            <Route path="/signin" component={SignIn} />
          </Suspense>
          <CssBaseline />
        </Switch>
      </Router>
    </>
  );
}

export default App;
