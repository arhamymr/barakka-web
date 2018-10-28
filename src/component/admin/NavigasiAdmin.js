import React, { Component } from 'react'
import {Link,Redirect,Route,Switch} from 'react-router-dom'
import login from '../login/'
import * as firebase from 'firebase'

export default class NavigasiAdmin extends Component {
	
	constructor(props) {
	  super(props)
	  this.signOut = this.signOut.bind(this)
	  this.state = {
	  	name:'no name',
			qurrentUser:' ',
			isAuthenticated : false
	 
	  }
	}

	componentWillMount(){
		firebase.auth().onAuthStateChanged((user) =>{
			if (user) {
				this.setState({isAuthenticated : true})
			} else {
				console.log('please login')
			}

		})
	}


	signOut(){
      firebase.auth().signOut().then(function() {
        console.log('log-out success')
      }).catch(function(error) {
        console.log(error)
      });
  
	}
	render() {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			  <a className="navbar-brand" href="#">Welcome Team </a>
			  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
			    <span className="navbar-toggler-icon"></span>
			  </button>
			  <div className="collapse navbar-collapse" id="navbarText">
			    <span className="navbar-nav mr-auto">
			     
			    </span>
			    <span className="navbar-text">
			    	{this.state.name} 
				    <button className='btn btn-outline-danger admin-logout' onClick={this.signOut} > 
				    	Logout 
				    </button> 
			    </span>


			  </div>
			</nav>
		)
	}
}