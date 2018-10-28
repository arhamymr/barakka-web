import React, { Component } from 'react'

export default class Order extends Component {
	constructor(props) {
        super(props)
        this.handlerClickPagination = this.handlerClickPagination.bind(this)   
        this.backHandler = this.backHandler.bind(this)
        this.nextHandler = this.nextHandler.bind(this)
        
    }
    
    backHandler(e){
        if ( Number(this.props.currentPage) > 1){
            return this.props.handlerClick(Number(this.props.currentPage) - 1 )
        } else {
            return null
        }
    }
    nextHandler(e){
        if ( (this.props.number.length) > Number(this.props.currentPage) ){
            return  this.props.handlerClick(Number(this.props.currentPage) + 1)
        } else {
            return null
        }
    }
	handlerClickPagination(e){
        this.props.handlerClick(Number(e.target.id))
    }
	render() {	
    let data = this.props.number.map( number => {
        return (
        <li className="page-item"
            key = {number}
            id = {number}
            onClick = {this.handlerClickPagination}
        > {number} </li> 
        )
    })
    return (
		<div>
			<ul className="pagination">
                <li onClick={this.backHandler}> Back </li>
               {data}
               <li onClick={this.nextHandler}> Next </li>
            </ul>
		</div>
	
		)
	}
}