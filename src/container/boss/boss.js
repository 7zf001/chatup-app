import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../store/reducers/chatuser'
import UserCard from '../../components/usercard/usercard'

@connect(
	state => state.chatuserReducer,
	{ getUserList }
)

class Boss extends Component {
	componentDidMount() {
		this.props.getUserList('genius')
	}

	render() {
		return (
			<UserCard list={this.props.data}/>
		)
	}
}

export default Boss