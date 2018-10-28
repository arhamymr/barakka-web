import React, { Component } from 'react'
import InputQty from './pricing/InputQty'
import AddButton from './pricing/AddButton'
import Standard from '../images/pricing/standar.png'
import '../App.css'

export default class Pricing extends Component {
  constructor(props) {
    super(props)
    this.typeGet = this.typeGet.bind(this)
    this.priceCalculator = this.priceCalculator.bind(this)
    this.reduceData = this.reduceData.bind(this)
    this.resetState = this.resetState.bind(this)
    this.state = {
      size:null,
      type : 'TShirt',
      qtyTotal : 0 ,
      Raglan: null,
      Tshirt : null,
      total : 0,
      // s,m,l,xl,xxl urutan berdasarkan dari index array 
      qtyTshirtAll:[0,0,0,0,0],
      qtyRaglanAll:[0,0,0,0,0]
    }
  }



  resetState() {
    this.setState({
      type : 'TShirt',
      // s,m,l,xl,xxl urutan berdasarkan dari index array 
      qtyTshirtAll:[0,0,0,0,0],
      qtyRaglanAll:[0,0,0,0,0]

    })
  }

  reduceData(){
    let AllRaglan= this.state.qtyRaglanAll.reduce(
      (accum,curr) => accum + curr)
    let AllTshirt= this.state.qtyTshirtAll.reduce(
      (accum,curr) => accum + curr)

    console.log('qrtrTshirt' + AllTshirt)
    console.log('qrtr' + AllRaglan)
  
    //  price process 
    //  Tshirt process 
    let priceTshirt,priceRaglan

    if ( AllTshirt <= 3 ){
      priceTshirt = AllTshirt * 85000 
    }
    else if (AllTshirt <= 11 ){
      priceTshirt = AllTshirt * 75000
    }
    else if (AllTshirt >= 12 && AllTshirt < 50 ){
      console.log('inside this ' + AllTshirt)
      priceTshirt = AllTshirt * 65000
    }
    else if (AllTshirt >= 50 ){

      priceTshirt = AllTshirt * 55000 
    }
    if (AllTshirt > 0 ) {
      this.setState({Tshirt : 'T-Shirt '+ AllTshirt + ' Harga ' + new Intl.NumberFormat(['ban', 'id']).format(priceTshirt)})
    }
    // raglan pricess 
    if ( AllRaglan <= 3 ){
      priceRaglan = (AllRaglan * (85000 + 10000))
    }
    else if (AllRaglan <= 11 ){
      priceRaglan = (AllRaglan * (75000 + 10000))
    }
    else if (AllRaglan >= 12 && AllRaglan < 50 ){
      priceRaglan = (AllRaglan * (65000 + 10000))
    }
    else if (AllRaglan >= 50 ){
      priceRaglan = (AllRaglan * (55000 + 10000) )
    }
    if (AllRaglan > 0 ){
      this.setState({Raglan : 'Raglan '+ AllRaglan + ' Harga ' + new Intl.NumberFormat(['ban', 'id']).format(priceRaglan)})
    }
    
    console.log('raglan' + priceRaglan)
    console.log('Tshier' + priceTshirt)
    
    let qtyTotal = AllTshirt + AllRaglan
    let priceTotal = priceRaglan + priceTshirt
    this.setState({qtyTotal : qtyTotal})
    this.setState({ total : priceTotal }) 
   
  }

  typeGet(dataFromInput){
  	this.setState({type:dataFromInput})
  }
  priceCalculator(dataFromInput) {

  	let type = this.state.type;
  	if (type === 'TShirt' ){
      console.log(this.state)
  		switch (dataFromInput[1]) {
  			case 's':	 
            this.setState((prevState) => 
            {
              qtyTshirtAll:prevState.qtyTshirtAll.splice(0,1,parseInt(dataFromInput[0],10))
            }
             )
        
  			
  				break;
  			case 'm':
  				
  			  this.setState((prevState) => 
            {
               qtyTshirtAll:prevState.qtyTshirtAll.splice(1,1,parseInt(dataFromInput[0],10))
            }
             )
        
  				break;
  			case 'l':
  				
  			  this.setState((prevState) => 
            {
               qtyTshirtAll:prevState.qtyTshirtAll.splice(2,1,parseInt(dataFromInput[0],10))
            }
             )
        
  				break;
  			case 'xl':
  				

  			  this.setState((prevState) => 
            {
               qtyTshirtAll:prevState.qtyTshirtAll.splice(3,1,parseInt(dataFromInput[0],10))
            }
             )
        
  				break;
  			case 'xxl':
  				
  				  this.setState((prevState) => 
            {
               qtyTshirtAll:prevState.qtyTshirtAll.splice(4,1,parseInt(dataFromInput[0],10))
            }
             )
        
  				break;
  			default:
  				// statements_def
  				break;
  		}
     
    
  	}
    if (type === 'Raglan' ){
    
      switch (dataFromInput[1]) {
        case 's':
         
       
            this.setState((prevState) => 
            {
               qtyRaglanAll:prevState.qtyRaglanAll.splice(0,1,parseInt(dataFromInput[0],10))
            }
             )
        
        
          break;
        case 'm':
          
          this.setState((prevState) => 
            {
               qtyRaglanAll:prevState.qtyRaglanAll.splice(1,1,parseInt(dataFromInput[0],10))
            }
             )
        
          break;
        case 'l':
          
          this.setState((prevState) => 
            {
               qtyRaglanAll:prevState.qtyRaglanAll.splice(2,1,parseInt(dataFromInput[0],10))
            }
             )
        
          break;
        case 'xl':
          

          this.setState((prevState) => 
            {
               qtyRaglanAll:prevState.qtyRaglanAll.splice(3,1,parseInt(dataFromInput[0],10))
            }
             )
        
          break;
        case 'xxl':
          
            this.setState((prevState) => 
            {
               qtyRaglanAll:prevState.qtyRaglanAll.splice(4,1,parseInt(dataFromInput[0],10))
            }
             )
        
          break;
        default:
          // statements_def
          break;
      }
     
    
    }

  }
  render() {
    console.log(this.state)
    return (
  
      <div className="pricing">
      	<div className="row">
	      	<div className="col-md-6">
	      		<div className="designStandart">
	      			<img className="T-Shirt-standart" src={Standard} alt="desain standar" /> 
	      			<p> Harga yang ada di 'Price Calculator' <br />adalah harga dengan design sablon standar 
	      			</p> 
	      				<p>*(1 atau 2 warna, depan belakang)</p> 
	      			
	      		</div> 
	      		
	      	</div>
	      	<div className="col-md-6">
	      	<div className="border">

	      		<h3> Price Calculator </h3>
          
	      		<div className="row">
		      		<div className="col-md-6">
			      		<label> size : S</label> 
			      		<InputQty typeGrabber={this.typeGet} valueGrabber={this.priceCalculator} size="s" />
			      	
			      		<label> size : M </label> 
			      		<InputQty typeGrabber={this.typeGet} valueGrabber={this.priceCalculator} size="m" /> 
			      	 
			      		<label> size : L </label> 
			      		<InputQty typeGrabber={this.typeGet} valueGrabber={this.priceCalculator} size="l" /> 
			        
		      		</div>
		      		 
		      		<div className="col-md-6">
              <label> size : XL </label> 
			      		<InputQty typeGrabber={this.typeGet} valueGrabber={this.priceCalculator} size="xl"/>  
			      		   
			      	<label> size : XXL </label> 
			      	<InputQty typeGrabber={this.typeGet} valueGrabber={this.priceCalculator} size="xxl" /> 
              
			      		
		      		</div>

              
            </div>
             <br />
             <input type="submit" onClick={this.reduceData} value="hitung" className="btn btn-outline-danger" />

             <input type="reset" onClick={this.resetState} value="Reset" className="btn btn-outline-danger" />
              

           
	      		<p className="priceText">IDR {new Intl.NumberFormat(['ban', 'id']).format(this.state.total)},-</p>

             { !(this.state.total === 0) ?  
              <div > 
                  <small>{this.state.Tshirt}</small> <br />
                  
                  <small>{this.state.Raglan} </small> <br />

	      		       <small> jumlah total baju  {this.state.qtyTotal} <br /> dengan harga Rp. {new Intl.NumberFormat(['ban', 'id']).format(this.state.total)} </small> 
              </div>
              : null
            }
	      		<div className="row">
	      		<div className="col-md-6">	
	      		<h4> Keterangan :</h4>
	      		
	      		<ul>
	      			<li> 1-3 = 85 k </li>
	      			<li> 4-11 = 75 k </li>
	      			<li> 12 > = 65 K </li>
	      			<li> 50 > = 55 k </li>
	      		</ul>
	      		</div>
	      		<div className="col-md-6">
	      		<ul>
	      			<br />
	      			<li> Panjang = + 5 k </li>
	      			<li> Reglan = + 10 K </li>
	      			<li> XXL = + 10 k </li>
	      		</ul>
	      		</div>
	      		</div>
	      	</div>
	      	</div> 
      	</div>
      </div>
    );
  }
}