import React from 'react'
import {Link} from 'react-router-dom'


export default () =>  {
    return (
    	<div className="order-now">
	    	<Link to="/order"> 
	    		<input className="button-order-now btn btn-outline-danger  btn-lg " type="button" value="Order Now" /> 
	    	</Link> 
    	</div>
	     
    );
  }
