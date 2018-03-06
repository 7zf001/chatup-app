import React, { Component } from 'react'
import Logo from '../../components/logo/logo'
import { Redirect } from 'react-router-dom'
import { Button, WingBlank, WhiteSpace, InputItem  } from 'antd-mobile'
import { connect } from 'react-redux'
import { signin } from '../../store/reducers/user'
import commonFrom from '../../components/hoc/commonform'

@connect(
	state => state.userReducer,
	{ signin }
)

@commonFrom

class Login extends Component {
	constructor(props) {
		super(props)
		this.submitSignin = this.submitSignin.bind(this)
	}

	goToRegister() {
		this.props.history.push('/register')
	}

	submitSignin() {
		const { username, password, type } = this.props.state;
		this.props.signin({ username, password, type })
	}

	render() {
		return (
			<form>
				{ this.props.redirectTo && <Redirect to={this.props.redirectTo}/> }
				<Logo />
				<WingBlank>
					<InputItem
						onChange={(val) => this.props.handleChange('username', val)}
					>
						账号
					</InputItem>
					<WhiteSpace />
					<InputItem 
						autoComplete="off"
						type="password"
						clear="true"
						onChange={(val) => this.props.handleChange('password', val)}
					>
						密码
					</InputItem>
					{ this.props.msg && <p>{this.props.msg}</p>}
					<WhiteSpace />
					<Button type="primary" onClick={this.submitSignin}>登录</Button>
					<WhiteSpace />
					<Button type="ghost" onClick={() => this.goToRegister()}>注册</Button>
				</WingBlank>
			</form>
		)
	}
}

export default Login;