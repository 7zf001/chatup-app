import React, { Component } from 'react'
import './logo.css'
import logoSrc from './job.png'

class Logo extends Component {
	render() {
		return (
			<div className="logo">
				<img src={logoSrc} alt="logo"/>
			</div>
		)
	}
}

export default Logo;