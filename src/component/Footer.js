import React from 'react';
import Support from '../images/support.png'
export default () => {
  	const footer = {
  		width:'100%',
  		color:'#D4D4D3',
      textAlign:'center'
  	}
  	const divFooter = {
  		width:'100%',
      backgroundColor:'#000000',
      color:'#ffffff',
  		padding:'25px'
  	}
    const support = {
      width:'80%'
    }
    return (
    	<div style={{...divFooter}}>

        <div className="row" >
          <div className="col-md-4" >
            <address>
            <strong>Barakka Bugis Screen Printing </strong><br />
            Jln. Muhammad Tahir, No 77<br />
            <br /> 
            <abbr title="Phone">P: 085241282310 </abbr> 
          </address>
          
          </div>
          <div className="col-md-4" >
           <address>
            <strong>Contact</strong><br />
            line  : barakkabsp <br />
            ig    : @barakkabsp <br />
            Wa : 085241282310 <br />
            web   : barakkastore.com <br />
           
          </address>
          </div>
          <div className="col-md-4" >
          <address>
            <strong> Support </strong><br />
            <img src={Support} alt="support" style={{...support}} />
          </address>
          </div>
        </div>
        <div style={{...footer}}>
      	<small > &copy;barakkastore.com , 2018 </small> 
    	   </div>
      </div> 
    );
  
}