import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'


import Home from './App'
import Login from './component/login/'
import Order from './component/order/'
import preOrder from './component/preOrder'
import Create from './component/create'
import Admin from './component/admin/'
import RequestOrder from './component/admin/RequestOrder'
import * as firebase from 'firebase'


let loggedIn = false;

export default () => (
   
   
	<Switch>
         <Route path="/" exact component={Home}  />
         <Route path="/login"   
        render={()=> 
            loggedIn ? 
            <Redirect to="/" />
            :
            <Login /> 
         } />
         <Route path='/admin'  component={Admin}  />
         <Route path='/event' component={Event} />
         <Route path='/preOrder' component={preOrder} />
         <Route path='/order' component={Order} />
         <Route path='/create' component={Create} />
         <Route path='/requestOrder' component={RequestOrder} />
    </Switch>
)
