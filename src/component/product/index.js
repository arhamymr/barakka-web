import React, { Component } from 'react'
import TShirt from './TShirt'
import Raglan from './Raglan'
import OrderNow from './OrderNow'


export default class Product extends Component {
	
	render() {
    return (
    	<div > 
      	<TShirt />
      	<Raglan /> 
      	<OrderNow /> 
	    </div>
    )
  }
}