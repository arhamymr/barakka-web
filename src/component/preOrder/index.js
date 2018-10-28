import React, { Component } from 'react'
import Header from '../Header'
import Navigation from '../Nav'
import LogoCampaign from '../../images/barakka-campaign.png'
import Footer from '../Footer'
import Order from './preOrderCard'
import * as firebase from 'firebase'

export default class PreOrder extends Component {
	constructor(){
		super()
		this.state = {
			PreOrder : []
		}
	}
	componentWillMount(){
		const previousPreOrder = this.state.PreOrder
		const rootRef= firebase.database().ref()
		const orderRef = rootRef.child("preOrder")
		orderRef
		.on('child_added', snap => {
			previousPreOrder.push({
				key : snap.key,
				title : snap.val().title,
				pathImage : snap.val().pathImage,
				harga : snap.val().harga,
				expireDate : snap.val().expireDate
			})
			this.setState({PreOrder : previousPreOrder})
					
		}, errorObject => {
			console.log("The read failed : " + errorObject.code)
		})
		
	}
	render() {
		return (
			<div>
				<Navigation titlePage="Pre#Order"/>
				<br />
				<br />
				<br/>
				<div className="container">
					<div className="row" >
						<div className="col-md-8" >
							<h1> Pre#order </h1>
							<div className="container">
								<div className="flex-container">
									{
										this.state.PreOrder.map((preOrder) => {
											return(
											<Order 
											key = {preOrder.key}
											pathImage = {preOrder.pathImage}
											title = {preOrder.title}
											harga = {preOrder.harga}
											 />
											)	
										})
									}
								</div>
							</div>
						</div>
						<div classname="col-md-4" >
							<h1> Recent Story </h1>
						</div>
					</div>

				</div>
				<Footer />
			</div>
		)
	}
}