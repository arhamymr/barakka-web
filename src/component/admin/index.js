import React, { Component } from 'react'

import {Link} from 'react-router-dom'
import Navigasi from './NavigasiAdmin'
import RequestOrder from './RequestOrder'
import TableUser from './TableUser'
import UploadPreOrder from './UploadPreOrder'

export default class Admin extends Component {
	constructor(props) {
	  super(props)
	  this.userRegister = this.userRegister.bind(this)
	  this.requestOrder = this.requestOrder.bind(this)
	  this.uploadPreOrder = this.uploadPreOrder.bind(this)
	  this.state = {
		  openComponent : ''
	  }
	}
	uploadPreOrder(){
		this.setState({openComponent:'uploadPreOrder'})
	}
	requestOrder(){
		this.setState({openComponent:'requestOrder'})
	}
	userRegister(){
		this.setState({openComponent : 'userRegister'})
	}


	render() {
		var componentRender
		console.log(this.state.openComponent)
		switch (this.state.openComponent) {
			case 'userRegister':
				componentRender =	<TableUser />
				break;
			case 'uploadPreOrder':
				componentRender = <UploadPreOrder />				
				break;
			case 'requestOrder':			
				componentRender = <RequestOrder />
				break;
			default:
				componentRender = <RequestOrder />			
				break;
		}
		return (
			<div>
				<Navigasi />
				<br /> 
				<div className="row">
					<div className="sidebar-admin col-md-2" >
						<ul>
							<li> <a onClick={this.userRegister} > User Register </a> </li>
							<li> <a onClick={this.requestOrder} > Request Order </a> </li>
							<li> <a onClick={this.uploadPreOrder} > upload Pre#Order </a> </li>
						</ul>
					</div>
					<div className="content-admin col-md-10">
					{componentRender}
					</div>
				</div>
			</div>
		)
	}
}