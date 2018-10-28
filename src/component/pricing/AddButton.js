import React, { Component } from 'react';

import '../../App.css'

export default class AddButton extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this)
    this.state = {};
  }
  clickHandler(){
    alert('yes' + this.props.buttonType)
  }
  render() {
    return ( 

      <button onClick={this.clickHandler}  className="button"> + </button>
          
    );
  }
}