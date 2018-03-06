import React, { Component } from 'react'
import { List, Badge } from 'antd-mobile'
import { connect } from 'react-redux'

@connect(
	state => state,
	null
)

class Msg extends Component {
	render() {
		const Item = List.Item
		const Brief = Item.Brief
		const myId = this.props.userReducer._id
		const users = this.props.chatReducer.users

		let userMsgList = {}

		this.props.chatReducer.chatmsg.forEach( v => {
			userMsgList[v.chatid] = userMsgList[v.chatid] || []
			userMsgList[v.chatid].push(v)
		})

		let msgListArray = Object.values(userMsgList)
		return (
			<div>
				{msgListArray
					.sort( (a, b) => (
						b[b.length - 1].create_time - a[a.length - 1].create_time
					))
					.map( v => {
						let latestChat = v[v.length - 1]
						// 获取对方的id,如果首次是我发送的，则获取对方id，如果是对方发送的，则获取对方
						let targetId = v[0].from === myId ? v[0].to : v[0].from
						let targetUser = users[targetId]
						let avatar = targetUser.avatar || 'man'
						let unreadCount = v.filter( v =>  v.to === myId && !v.read).length
						
						if (!targetUser) {
							return null
						}

						return (
							<List 
								key={latestChat._id}
							>
								<Item
									thumb={require(`../../components/img/${avatar}.png`)}
									extra={<Badge text={unreadCount}/>}
									arrow="horizontal"
									onClick={ () => {
										this.props.history.push(`/chat/${targetId}`)
									}}
								>
									{targetUser.name || ''}
									<Brief>{latestChat.content}</Brief>
								</Item>
							</List>
						)
					} )}
			</div>
		)
	}
}

export default Msg