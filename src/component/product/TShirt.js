import React, { Component } from 'react'
import TShirt1 from '../../images/product/black-t-shirt.png'
import ColorBar from './ColorChooser'
import '../../App.css';

export default class Product extends Component {
	constructor(props) {
	  super(props)
	  this.state = {
	  	tShirt : TShirt1,
	  };
	}
	getData(dataFromColorBox) {
		this.setState({tShirt:dataFromColorBox})
	}	
	render() {
    
    return (
    	<div> 
    		  <div className="row productRow">
		      	<div className="col-md-6 T-Shirt">
		  			<h2 className="subtitle">T-Shirt</h2>
			  		<p className="desc"> 
			  			Kami Menjual Produk kaos berjenis T-Shirt <br />
			  			Tipe Lengan Panjang & pendek <br /> 
			  			Bahan Cotton Combat 24s & 30s <br />
			  			warna yang bervariasi  
			  		</p>
			  	
			  		<div className="Tshirt-ColorBar">
			  		<ColorBar type="TShirt" source={this.getData.bind(this)} /> 
			  		</div> 
			  		<div className="clear"> </div>
			  		<p className="colorBarText"> * klik color-box </p> 
		  		</div>
		      	<div className="col-md-6 imageRow">
		      		<div className="row">
		      			<img className="imgProduct" src={this.state.tShirt} alt="product barakka" />
		      		</div>
		      		<div className="row">	
		      			<img src={require('../../images/product/shadow.png')} alt="shadow" className="shadow" />  
		      		</div>
		      	</div>
		      	
		      </div>
	      </div>
    );
  }
}