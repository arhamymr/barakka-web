import React, { Component } from 'react'
import '../../App.css'


class Box extends Component {
 
  clickColorHandler() {
    
    let color = this.props.resource
    this.props.data(color)
  }
  render(){
    return <div  onClick={this.clickColorHandler.bind(this)} className={this.props.color + ' box'} > </div>
  }
}
export default class ColorChooser extends Component {
  handlerClick(dataFromBox){
    this.props.source(dataFromBox)
  }
    render() {
    let type = this.props.type === 'TShirt';
    console.log(type)
    return (
      <div>
        <Box color='grey' data={this.handlerClick.bind(this)} resource={ type ? require('../../images/product/grey-t-shirt.png'):require('../../images/product/grey-raglan.png')
        }/>
        <Box color='blue' data={this.handlerClick.bind(this)} resource={type ? require('../../images/product/blue-t-shirt.png'): require('../../images/product/blue-raglan.png')} /> 
        <Box color='yellow' data={this.handlerClick.bind(this)} resource={type ? require('../../images/product/yellow-t-shirt.png') : require('../../images/product/yellow-raglan.png')}/> 
        { type ?

        <Box color='black' data={this.handlerClick.bind(this)} resource={require('../../images/product/black-t-shirt.png')} /> :(null)
          }
        { !type  ?
        (<Box color='magenta' data={this.handlerClick.bind(this)} resource={require('../../images/product/magenta-raglan.png')} />)
        : (null)
      }
       { type  ?
        (<Box color='red' data={this.handlerClick.bind(this)} resource={require('../../images/product/red-t-shirt.png')} />)
        : (null)
      }

      
     </div>
    );
  }
}