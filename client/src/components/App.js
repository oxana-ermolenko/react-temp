import React, {Suspense} from 'react';
import {Switch, Route} from "react-router-dom";
import Auth from '../hoc/auth';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import Navbar from './views/Navbar/Navbar';
import Footer from './views/Footer/Footer';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Navbar />
      <div style={{paddingTop: '75px', minHeight: 'calc(100vh-80px'}}>
        <Switch>
          <Route exact path = '/' component = {Auth(LandingPage, null)} />
          <Route exact path = '/login' component = {Auth(LoginPage, false)} />
          <Route exact path = '/register' component = {Auth(RegisterPage, false)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
