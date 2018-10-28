import React, { Component } from 'react';


export default class InputQty extends Component {
  constructor(props) {
    super(props);
    this.inputHandlerQuantity = this.inputHandlerQuantity.bind(this)
    this.inputHandlerType = this.inputHandlerType.bind(this)
    this.state = {
      disabled : true
    }
  }
  
  inputHandlerType(e){
    this.setState({disabled: false})
    this.props.typeGrabber(e.target.value)
  }

  inputHandlerQuantity(e){
    let size = this.props.size;
    let _value = e.target.value
    this.props.valueGrabber([_value,size])
  }

  render() {
    return (
      <div>
        
         <select name='type' onChange={this.inputHandlerType} className="form-control form-control-sm TSelect">
            <option > -Type- </option> 
            <option value="TShirt"> T-Shirt </option>
            <option value="Raglan"> Raglan </option>
         </select> 

         <input id='qty' className="form-control-sm form-control" onChange={this.inputHandlerQuantity} placeholder="masukkan jumlah" type="number" disabled={this.state.disabled} />
      </div>
    );
  }
}