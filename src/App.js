import React from 'react';
import { Switch, Route,Link } from "react-router-dom";
import './App.css';

import Admin from "./components/Admin";

import Login from "./components/Login";
import LogOut from './components/Logout';
import Registrator from './components/Registrator';

import Notfond from "./404/notFond";






const App = (props) => {

  return (
    <div>
     

      {/* <Header/> */}
      <Switch>

        <Route exact path='/' component={Login} />

        <Route path='/admin' component={Admin} />

        <Route path='/logout' component={LogOut} />

        <Route path='/register' component={Registrator} />

      

       
 
        <Route component={Notfond} />

        
      </Switch>

    </div>
  );
}


export default App;