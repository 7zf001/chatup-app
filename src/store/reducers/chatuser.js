import axios from 'axios'

// action type
const USER_LIST = 'USER_LIST'

// state
const initState = {
	data: []
}

// reducer
export function chatuserReducer(state = initState, action) {
	switch (action.type) {
		case USER_LIST:
			return { ...state, data: action.payload}
		default:
			return state;
	}
}

// action
function userList (data) {
	return { type: USER_LIST, payload: data }
}

export function getUserList (type) {
	return dispatch => {
		axios.get(`/user/list?type=${type}`)
			.then( res => {
				dispatch(userList(res.data.data))
			})
	}
}