import React, { Component } from 'react'

import Footer from '../Footer'
import ThreeD from './3dpanel'

export default class Create extends Component {
	render() {
		return (
			<div>
				<ThreeD />
				<Footer />
			</div>
		)
	}
}