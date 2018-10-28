import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export default class UploadEvent extends Component {
	constructor(props) {
	  super(props)
	  this.updateProfil = this.updateProfile.bind(this)
	  this.state = {
	  	
	  }
	}

	updateProfil(){
		let user = firebase.auth().currentUser
		let displayName = this.inputDisplayName.value
		let photoURL = this.inputPhotoURL.value

		user.updateProfile({
		  displayName: displayName,
		  photoURL: photoURL
		}).then(function() {
		  // Update successful.
		}).catch(function(error) {
		  // An error happened.
		});
	}
	render() {
		return (
			<div className="container">
			</div>
		)
	}
}