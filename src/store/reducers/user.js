import axios from 'axios'
import { getRedirectPath } from '../../util'

const AUTH_SUCCESS = 'AUTH_SUCCESS'

const ERROR_MSG = 'ERROR_MSG'

const LOGOUT = 'LOGOUT'

const initState = {
	redirectTo: '',
	username: '',
	msg: '',
	type: '',
	avatar: '',
}

// reducer
export function userReducer(state = initState, action) {
	switch (action.type) {
		case AUTH_SUCCESS:
			return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
		case ERROR_MSG:
			return { ...state, msg: action.payload.msg }
		case LOGOUT:
			return { ...initState }			
		default:
			return state;
	}
}

// action
function authSuccess(data) {
	return {type: AUTH_SUCCESS, payload: data}
}

function errorMsg(msg) {
	return {type: ERROR_MSG, payload: { msg }}
}

export function logout() {
	return { type: LOGOUT }
}

export function loadinfo(userinfo) {
	return {type: AUTH_SUCCESS, payload: userinfo}
}

export function update(data) {
	return dispatch => {
		axios.post('/user/update', data)
			.then( (res) => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(authSuccess(res.data.data));
				} else {
					dispatch(errorMsg(res.data.msg));
				}
			})
	}
}

export function register({ username, password, rePassword, type }) {
	if (!username || !password || !rePassword) {
		return errorMsg('请输入密码和账号!');
	}

	if (password !== rePassword) {
		return errorMsg('两次密码不正确!');
	}

	return dispatch => {
		axios.post('/user/register', { username, password, type })
			.then( (res) => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(authSuccess({ username, password, type }));
				} else {
					dispatch(errorMsg(res.data.msg));
				}
			})
	}
}

export function signin({ username, password }) {
	if (!username || !password ) {
		return errorMsg('请输入密码和账号!');
	}

	return dispatch => {
		axios.post('/user/signin', { username, password })
			.then( (res) => {
				if (res.status === 200 && res.data.code === 0) {
					dispatch(authSuccess(res.data.data));
				} else {
					dispatch(errorMsg(res.data.msg));
				}
			})
	}
}