import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://127.0.0.1:9093')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_SET_READ = 'MSG_SET_READ'
// 退出清空数据
const CLEAR_DATA = 'CLEAR_DATA'

const initState = {
	chatmsg: [],
	users: {},
	unread: 0
}

export function chatReducer (state = initState, action) {
	switch (action.type) {
		case MSG_LIST:
			return { 
				...state, 
				users: action.payload.users, 
				chatmsg: action.payload.msgs, 
				unread: action.payload.msgs.filter( v => v.from !== action.payload.userId && !v.read ).length 
			}
		case MSG_RECV:
			return { 
				...state, 
				chatmsg: [ ...state.chatmsg, action.payload.msg ], 
				unread: action.payload.msg.from !== action.payload.userId ? state.unread + 1 : state.unread }
		case MSG_SET_READ:
			return { ...state, unread: state.unread - action.payload.modifidNum, chatmsg: state.chatmsg.map( v => {
					if (v.from === action.payload.from) v.read = true
					return v
				} )}
		case CLEAR_DATA:
			return { ...initState }				
		default:
			return state
	}
}

// action
function msgList ({ msgs, users, userId }) {
	return {type: MSG_LIST, payload: { msgs, users, userId }}
}

function msgRecv ({ msg, userId }) {
	return {type: MSG_RECV, payload: {msg, userId}}
}

function msgRead ({from, userId, modifidNum}) {
	return { type: MSG_SET_READ, payload: {from, userId, modifidNum} }
}

export function clearData () {
	return {type: CLEAR_DATA}
}

export function readMsg (from, userId) {
	return (dispatch) => {
		axios.post('/user/readmsg', {from})
			.then( (res) => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(msgRead({from, userId, modifidNum: res.data.num}))
				}
			})
	}
}

export function getMsgList () {
	return (dispatch, getState) => {
		axios.get('/user/chatmsglist')
			.then( (res) => {
				const userId = getState().userReducer._id
				if (res.status === 200 && res.data.code === 0) {
					res.data.userId = userId
					dispatch(msgList(res.data))
				}
			})
	}
}

export function sendMsg ({from, to, content}) {
	return () => {
		socket.emit('sendmsg', {from, to, content})
	}
}

export function receiveMsg () {
	return (dispatch, getState) => {
		// 确保进入应用只建立一次收听广播
		if (socket.connected !== true) {
			socket.on('receivemsg', function (data) {
				const userId = getState().userReducer._id
				dispatch(msgRecv({msg: data, userId}))
			})
		}
	}
}