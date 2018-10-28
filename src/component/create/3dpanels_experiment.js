import React, {Component} from 'react';
import threeEntryPoint from './threeEntryPoint'


export default class threeContainer extends Component {
	componentDidMount(){
		threeEntryPoint(this.threeRootElement);
	}

	render(){
		return (
			<div ref={element => this.threeRootElement = element} />
			)
	}
}