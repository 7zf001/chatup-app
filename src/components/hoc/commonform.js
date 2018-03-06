import React, { Component } from 'react'

function commonForm (Comp) {
	return class WrapperComp extends Component {
		constructor(props) {
			super(props)
			this.state = {}
			this.handleChange = this.handleChange.bind(this)
		}

		handleChange(key, value) {
			this.setState({
				[key]: value
			})
		}

		render() {
			return (
				<Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
			)
		}
	}
}

export default commonForm