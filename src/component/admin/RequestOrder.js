import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Order from './order/OrderCard'
import '../../App.css'
import Pagination from './order/Pagination'
import * as firebase from 'firebase'

export default class RequestOrder extends Component {
	constructor(props) {
	  super(props)
	  this.handlerClickPagination = this.handlerClickPagination.bind(this)
	 
	 
	  this.state = {
		  requestOrder : [],
		  currentPage : 1,
		  orderPerPage : 3,
		  
	  }
	}
	
	handlerClickPagination(dataFromChildPagination){
		this.setState({
			currentPage : dataFromChildPagination
		})
	}

	componentWillMount(){
		const previousOrder = this.state.requestOrder
		const rootRef= firebase.database().ref()
		const orderRef = rootRef.child("Order")

		orderRef
		.on('child_added', snap => {
			previousOrder.push({
				key : snap.key,
				name : snap.val().nama,
				userId: snap.val().userId,
				detailOrder : snap.val().detailOrder,
				telepon : snap.val().telepon,
				pathImage : snap.val().pathImage,
				lokasi : snap.val().lokasi
			})
			this.setState({requestOrder : previousOrder})
					
		}, errorObject => {
			console.log("The read failed : " + errorObject.code)
		})
		
	}
	render() {

	
		const {requestOrder,currentPage,orderPerPage} = this.state
		const IndexOfLastOrder = currentPage * orderPerPage
		const IndexOfFirstOrder = IndexOfLastOrder - orderPerPage
		const currentDataOrder = requestOrder.slice(IndexOfFirstOrder,IndexOfLastOrder)
			// render data order 
		let numberPaginate = []
		for (let i = 1; i <= Math.ceil(requestOrder.length / orderPerPage); i++){
			numberPaginate.push(i)
		}
		// slice data to a piece 
		console.log("ini curent state")
		console.log(this.state.currentPage)
	return (
		<div>				
			<div className="container">
				<h1> Request Order </h1>
				<div className="flex-container" >
					{
						currentDataOrder.map((order) => {
							return(
							<Order 
							name = {order.name}
							userId = {order.userId}
							detailOrder = {order.detailOrder}
							key ={order.key}
							telepon = {order.telepon}
							pathImage = {order.pathImage}
							lokasi = {order.lokasi} />
							)
							
						})
					}
				</div>
				<div>
					<Pagination 
					currentPage={this.state.currentPage}
					number={numberPaginate}
					handlerClick={this.handlerClickPagination} /> 
				</div>
				
			</div>
		</div>
		)
	}
}