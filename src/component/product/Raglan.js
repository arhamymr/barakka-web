import React, { Component } from 'react'
import RaglanGrey from '../../images/product/grey-raglan.png'
import '../../App.css';

import ColorBar from './ColorChooser'

export default class Product extends Component {
	constructor(props) {
	  super(props)
	  this.getData = this.getData.bind(this)
	  this.state = {
	  	raglan : RaglanGrey
	  }
	}
	getData(dataFromColorBox){
		this.setState({raglan:dataFromColorBox})
	}
  	render() {
    return (
    	<div> 
    		<div className="row productRow">	
		  		<div className="col-md-6 imageRow">
		      		<div className="row ">
		      			<img src={this.state.raglan} alt="product barakka" className="imgProduct raglanAnim" />
		      		</div>
		      		<div className="row">	
		      			<img src={require('../../images/product/shadow.png')} alt="shadow" className="shadow" />
		      		</div>
		  		</div>
		      	<div className="col-md-6 Raglan">
		      		<h2 className="subtitle"> Raglan</h2>
			  			<p className="desc"> Kami Menjual Produk kaos berjenis Raglan<br />
			  			Tipe Lengan Panjang, 3/4 dan pendek <br /> 
			  			dengan warna kombinasi yang bermacam macam  
			  			</p>
			  			<ColorBar type="Raglan" source={this.getData.bind(this)} /> 	
			  			
			  			<div className="clear"> </div>
			  			<p className="colorBarText"> * klik color-box : </p> 
			  			</div>
			  		
		      		</div>
		      </div>
	     
    );
  }
}