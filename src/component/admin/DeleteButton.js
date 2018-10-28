import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import DeleteIcon from ''


export default class DeleteButton extends Component {
	constructor(props) {
	  super(props);
	  this.deleterUser = this.deleteUser.bind(this)

	}

	deleteUser(){
		var user = firebase.auth().currentUser;

		user.delete().then(function() {
		  // User deleted.
		}).catch(function(error) {
		  // An error happened.
		})
	}
	
	render() {
		return (
			<button className="btn btn-outline-danger"> Delete user </button>
		)
	}
}