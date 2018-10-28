import React, { Component } from 'react'
import '../../App.css'
import Expand from '../ClickImages'

export default class Order extends Component {
	constructor(props) {
	  super(props)
      this.key = props.key
      this.title = props.title
      this.pathimage = props.pathImage
			this.harga = props.harga
			this.expiredDate = props.expiredDate
			this.expandImage = this.expandImage.bind(this)
			this.state = {
				isOpen : false
			}
	}

	expandImage(){
		this.setState({isOpen:!this.state.isOpen})
	}
	
	render() {
	return (

	<div>
			<div className="card "  >
				<img className="card-img-top" 
				onClick={this.expandImage}
				src={this.pathImage} 
				alt="Card image cap" />
				<div className="card-header">
					{this.title}
				</div>
				<div className="card-body">
					<p className="card-text">{this.detailOrder} </p>
					<p> Harga : {this.harga} </p>
					<p> Expired Date : {this.expiredDate} </p> 
					
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