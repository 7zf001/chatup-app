import { combineReducers } from 'redux'
import { userReducer } from './reducers/user'
import { chatuserReducer } from './reducers/chatuser'
import { chatReducer } from './reducers/chat'

export default combineReducers({ userReducer, chatuserReducer, chatReducer });