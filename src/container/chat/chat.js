import React, { Component } from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, receiveMsg, readMsg } from '../../store/reducers/chat'
import { getChatId } from '../../util'
import _ from 'lodash'

@connect(
	state => state,
	{ getMsgList, sendMsg, receiveMsg, readMsg }
)

class Chat extends Component {
	constructor(props) {
		super(props)
		this.state = {
			text: '',
			msg: [],
			showCarousel: false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.scrollToDown = this.scrollToDown.bind(this)
	}

	handleChange(v) {
		this.setState({
			text: v
		})
	}

	handleSubmit() {
		if (_.trim(this.state.text) === '') {
			console.log('文本为空')
			return
		}
		
		const from = this.props.userReducer._id
		const to = this.props.match.params.user
		const content = this.state.text
		
		this.props.sendMsg({from, to, content})
		
		this.setState({
			text: '',
			showCarousel: false
		})

		this.scrollToDown()
	}

	componentDidMount() {
		if (!this.props.chatReducer.chatmsg.length) {
			this.props.getMsgList()
			this.props.receiveMsg()
		}

		this.scrollToDown()
	}

	componentWillUnmount() {
		const formId = this.props.match.params.user
		const id = this.props.userReducer._id
		this.props.readMsg(formId, id)
	}

	fixCarousel () {
		setTimeout( function () {
			window.dispatchEvent(new Event('resize'))
		}, 0)
	}
	
	scrollToDown() {
		var el2 = document.querySelector('.wrap-scroll')
		
		if (el2) {
			setTimeout(function () {
				el2.scrollTop = el2.scrollHeight
			}, 100)
		}
	}

	render() {
		const Item = List.Item
		const id = this.props.userReducer._id
		const toUserId = this.props.match.params.user
		const toUser = this.props.chatReducer.users[toUserId]
		const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '.split(' ').filter( v => !!v).map( v => ({ text: v }) )
		
		if (!toUser) {
			return '加载中......';
		}

		const chatId = getChatId(id, toUserId)
		const currentChatMsgs = this.props.chatReducer.chatmsg.filter( v => v.chatid === chatId)
	
		return (
			<div id="chat-page">
				<NavBar
				  className="fixd-header"
					icon={<Icon type="left"/>}
					onLeftClick={this.props.history.goBack}
				>
					{toUser.name}&nbsp;{toUser.company}
				</NavBar>
		
				<div className="wrap-scroll" ref={this.scrollToDown}>
					<List>
						{ currentChatMsgs.map( v => (
							v.from === id ? (
								<Item
									key={v._id}
					                multipleLine={true}
					                wrap={true}
									className="chat-me"
									extra={<img alt="avatar" src={require(`../../components/img/${this.props.userReducer.avatar}.png`)}/>}
								>{v.content}</Item>
							) : (
								<Item 
									key={v._id}
									multipleLine={true}
									wrap={true}
									thumb={require(`../../components/img/${toUser.avatar}.png`)}
								>
									{v.content}
								</Item>
							)
						))}
					</List>
					
				</div>
            
				<div className="stick-footer">
					<List>
						<InputItem 
							placeholder="请输入"
							onChange={v => {this.handleChange(v)}}
							extra={
								<div>
									<span 
									  aria-label="emoji"
									  role="img"
									  style={{marginRight: 15}} 
									  onClick={ () => {
										this.setState({
											showCarousel: !this.state.showCarousel
										})
										this.fixCarousel()
									}}>😄</span>
									<span 
									  onClick={this.handleSubmit}
									>发送</span>
								</div>
							}
							value={this.state.text}
						/>
						{ this.state.showCarousel && <Grid 
							data={emoji}
							columnNum={9}
							isCarousel={true}
							carouselMaxRow={4}
							onClick={ (data) => {
								this.setState({
									text: this.state.text + data.text
								})
							}}
						/>}
					</List>
				</div>
			</div>	
		)
	}
}

export default Chat;