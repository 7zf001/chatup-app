import React, { Component } from 'react'
import './logo.css'

class Logo extends Component {
	render() {
		return (
			<div className="logo">
				<img src={require('./job.png')} alt="logo"/>
			</div>
		)
	}
}

export default Logo;