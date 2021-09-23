import './App.css';
import React, {Suspense} from 'react';
// import SignUp from './components/SignUp';
// import SignIn from './components/SignIn';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavBar from './components/NavBar';
import { CssBaseline } from '@mui/material';

const SignUp = React.lazy(() => import('./components/SignUp'));
const SignIn = React.lazy(() => import('./components/SignIn'));

function App() {

  // const loadingStyleCss = {
  //   top: 50%
  // }

  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={NavBar} />

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
