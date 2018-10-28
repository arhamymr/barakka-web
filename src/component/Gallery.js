import React, { Component } from 'react'
import axios from 'axios'

export default class Gallery extends Component {	
	constructor(props){
		super(props)
		this.state = {
			data : []
		}
	}
	componentDidMount(){
		const url =
		 `https://api.instagram.com/oauth/authorize/?client_id=15b3a5a1aa1f43b9ad81131f45a763d7&redirect_uri=http://localhost:3000&response_type=code`
		
		 axios
		.get(url).then( res => {
			const data = res.data
			console.log("ini dalam console log gallery ")
			console.log(data)
			this.setState({ data : data })
		}) 
	}
	render() {
		return (
			<div>
				<p>{this.state.data}</p> 
			</div>
		)
	}
}