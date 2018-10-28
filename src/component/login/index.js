import React, { Component } from 'react'
import {Link, Redirect } from 'react-router-dom'
import Logo from '../../images/logo-barakka-small-black.png'
import Facebook from 'react-icons/lib/fa/facebook-official'
import Google from 'react-icons/lib/fa/google-plus-square'
import * as firebase from 'firebase'

export default class Login extends Component {

		constructor(props) {
		  
		  super(props)
		  this.googlePlusAuth = this.googlePlusAuth.bind(this)
		  this.facebookAuth = this.facebookAuth.bind(this)
		  this.state = {
		  	errorMessage : null
		  }
		}

		
	
		googlePlusAuth(){
			console.log('google plus authenticated')
			var provider = new firebase.auth.GoogleAuthProvider()
			firebase.auth().signInWithPopup(provider).then(function(result) {
				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = result.credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				// ...
			}).catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				// ...
			});
		}
		facebookAuth(){
			console.log('login with facebook')
			var provider = new firebase.auth.FacebookAuthProvider();
			
			firebase.auth().signInWithPopup(provider).then(function(result) {
			  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
			  var token = result.credential.accessToken;
			  // The signed-in user info.
			  var user = result.user;
			  // ...
			}).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  var credential = error.credential;
			  // ...
			});
		}

		render(){
		return (
			<div className="container">
			<div className="row " >
				<div className="col-md-4">
				</div>
				<div className="col-md-4 container-login">
					<div className="border-login">
					<Link to="/" ><img src={Logo} alt='logo login' className="logo-login"/></Link>
       		<div className="login-with-container" >
       		   <p className="login-with" > Login Dengan : </p>
       		  	<Facebook onClick={() => this.facebookAuth() } className="facebook" /> 
     		    	<Google onClick={this.googlePlusAuth} className="google" /> 
     		  </div>
					 </div> 
				</div>
				<div className="col-md-4">
				</div>
			</div>
			</div>
		)
	}
}