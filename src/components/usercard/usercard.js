import React, { Component } from 'react'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter

class UserCard extends Component {
	static propTypes = {
		list: PropTypes.array.isRequired,
	}

	handleClick(id) {
		this.props.history.push(`/chat/${id}`)
	}

	render() {
		return (
			<WingBlank>
				<WhiteSpace />
				{this.props.list.map( v => (
					v.avatar &&
					<Card 
						onClick={() => {this.handleClick(v._id)}} 
						key={v._id} 
						style={{marginBottom: 10}}>
						<Card.Header 
							title={v.username} 
							thumb={require(`../../components/img/${v.avatar}.png`)}
							extra={v.title || '无业游民'}
						/>
						<Card.Body>
							{!!v.company && <p>公司：{v.company}</p>}
							{!!v.money && <p>薪资：{v.money}</p>}
							职位描述：{v.desc.split('\n').map( desc => (<p key={desc}>{desc}</p>))}
						
						</Card.Body>
					</Card>
				))}
			</WingBlank>
		)
	}
}

export default UserCard