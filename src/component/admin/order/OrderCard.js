import React, { Component } from 'react'
import Expand from '../../ClickImages'
export default class Order extends Component {
	constructor(props) {
		super(props)
		this.expandImage = this.expandImage.bind(this)
	  this.key = props.key
	  this.name = props.name
	  this.userId = props.userId
	  this.detailOrder = props.detailOrder
	  this.telepon = props.telepon
	  this.pathImage = props.pathImage
		this.lokasi = props.lokasi
		this.state = {
			isOpen : false
		}
	}
	expandImage(){
		console.log("isOpen set To true ")
		this.setState({isOpen: !this.state.isOpen})
	}
	render() {
	
	return (
		<div>
			<div className="card " >
				<img className="card-img-top" onClick={this.expandImage} src={this.pathImage} alt="Card image cap" />
				<div className="card-header">
					{this.name}
				</div>
				<div className="card-body">
					<p className="card-text">{this.detailOrder} </p>
					<p> {this.telepon} </p>
					<p> {this.lokasi}  </p> 
				</div>
			</div>

			
			<div>
				<Expand 
				name = {this.name}
				show={this.state.isOpen}  
				imgSrc={this.pathImage}
				onClose = {this.expandImage}
				 contact={this.telepon}
				 lokasi ={this.lokasi} 
				 />
				 

			</div>
		</div>
	
		)
	}
}