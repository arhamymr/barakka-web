import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class DeleteButton extends Component {
	constructor(props) {
	  super(props)
	  this.updateEmail = this.updateEmail.bind(this)
	}
	updateEmail(){
		let email = this.inputPassword.value;
		var user = firebase.auth().currentUser;
		user.updateEmail(email).then(function() {
		  // Update successful.
		}).catch(function(error) {
		  // An error happened.
		});
	}
	render() {
		return (

			<div className="form-group">
          		<label htmlFor="email">updateEmail</label>
           		<input type="email"  className="form-control" placeholder="update email" 
           		ref={(input) => {this.inputPassword = input } } />
           		<button className="btn btn-danger" onClick={this.updateEmail} > UpdateEmaisl </button> 
         	</div>
		)
	}
}