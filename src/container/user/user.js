import React, { Component } from 'react'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import BrowserCookies from 'browser-cookies'
import { logout } from '../../store/reducers/user'
import { clearData } from '../../store/reducers/chat'

@withRouter
@connect(
	state => state.userReducer,
	{ logout, clearData }
)

class User extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dialogState: false
		}
		this.logout = this.logout.bind(this)
	}

	logout() {
		const alert = Modal.alert
		alert('注销', '是否确定注销登录？', [
			{text: '取消', onPress: () => {console.log('cancel')}},
			{text: '确认', onPress: () => {
				BrowserCookies.erase('userId');
				this.props.logout()
				this.props.clearData()
				this.props.history.push('/login')
			}}
		])
	}

	render() {
		const props = this.props
		const Item = List.Item
		const Brief = Item.Brief

		return (
			props.avatar ? (
				<div>
					<Result
						imgUrl={require(`../../components/img/${props.avatar}.png`)}
						title={props.username}
						message={props.type === 'boss' ? props.company : null}
					/>
					<List renderHeader="个人简介">
						<Item wrap>
							{props.title}
							<Brief>
								{props.desc}
							</Brief>
						</Item>
					</List>
					<WhiteSpace />
					<Button type="primary" onClick={this.logout}>注销登录</Button>
				</div>
			)
			: null
		)
	}
}

export default User;