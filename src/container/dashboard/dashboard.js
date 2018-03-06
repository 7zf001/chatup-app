import React, { Component } from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import NavLink from '../../components/navlink/navlink'
import { Route } from 'react-router-dom'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../msg/msg'
import { getMsgList, receiveMsg } from '../../store/reducers/chat'
import QueueAnim from 'rc-queue-anim'

@connect(
	state => state,
	{ getMsgList, receiveMsg }
)

class Dashboard extends Component {
	componentDidMount() {
		if (!this.props.chatReducer.chatmsg.length) {
			this.props.getMsgList()
			this.props.receiveMsg()
		}
	}
	render() {
		const navList = [
			{
				path: '/boss',
				title: '牛人列表',
				icon: 'boss',
				text: '牛人',
				component: Boss,
				hide: this.props.userReducer.type.toLowerCase() !== 'boss' 
			},
			{
				path: '/genius',
				title: 'Boss列表',
				icon: 'job',
				text: 'Boss',
				component: Genius,
				hide: this.props.userReducer.type.toLowerCase() !== 'genius' 
			},
			{
				path: '/msg',
				title: '消息列表',
				icon: 'msg',
				text: '消息',
				badgeCount: this.props.chatReducer.unread,
				component: Msg,
			},
			{
				path: '/me',
				title: '个人中心',
				icon: 'user',
				text: '我',
				component: User,
			}
		]

		const findNav = navList.find( v => v.path === this.props.location.pathname)
		const pageTitle = !findNav ? '' : findNav.title

		return (
			<div>
				<NavBar className="fixd-header">{ pageTitle || '' }</NavBar>
				
				<div className="dashboard-container">
					<QueueAnim type='left' duration={800}>
						{findNav ? 
							<Route key={findNav.path} path={findNav.path} component={findNav.component}/>
							: ''}
					</QueueAnim>					
				</div>

				<NavLink data={navList}/>
			</div>
		)
	}
}

export default Dashboard;