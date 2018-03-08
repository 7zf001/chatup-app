import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, WingBlank, WhiteSpace, InputItem, Toast  } from 'antd-mobile'
import { connect } from 'react-redux'
import { signin, clearMsg } from '../../store/reducers/user'
import commonFrom from '../../components/hoc/commonform'
import './login.css'

@connect(
	state => state.userReducer,
	{ signin, clearMsg }
)

@commonFrom

class Login extends Component {
	constructor(props) {
		super(props)
		this.submitSignin = this.submitSignin.bind(this)
		this.toDoClearMsg = this.toDoClearMsg.bind(this)
	}

	goToRegister() {
		this.props.history.push('/register')
	}

	toDoClearMsg() {
		this.props.clearMsg()
	}

	submitSignin() {
		const { username, password, type } = this.props.state;
		this.props.signin({ username, password, type })
	}
	
	componentDidUpdate() {
		this.props.msg && Toast.fail(this.props.msg, 1, this.toDoClearMsg)
	}

	render() {
		return (
			<form className="loginForm">
				{ this.props.redirectTo && <Redirect to={this.props.redirectTo}/> }
				
				<img className="loginImage" src={require('./logo.png')} alt="images"/>

				<WingBlank>
					<InputItem
						className="loginList"
						onChange={(val) => this.props.handleChange('username', val)}
					>
						<i className="icon anticon icon-user icon-white icon-bg"></i>
					</InputItem>
					<WhiteSpace />
					<InputItem 
						className="loginList"
						autoComplete="off"
						type="password"
						clear="true"
						onChange={(val) => this.props.handleChange('password', val)}
					>
						<i className="icon anticon icon-lock icon-white icon-bg"></i>
					</InputItem>
					
					<Button className="submitBtn" type="primary" onClick={this.submitSignin}>登录</Button>
				</WingBlank>
			</form>
		)
	}
}

export default Login;