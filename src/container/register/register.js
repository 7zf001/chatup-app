import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, List, WingBlank, WhiteSpace, InputItem, Radio  } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../store/reducers/user'
import commonFrom from '../../components/hoc/commonform'

@connect(
	state => state.userReducer,
	{ register }
)

@commonFrom

class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [
				{value: 'genius', label: '牛人'},
				{value: 'boss', label: 'BOSS'}
			],
		}
	}

	componentDidMount() {
		this.props.handleChange('type', 'genius')
	}

	submitRegister() {
		const { username, password, rePassword, type } = this.props.state
		this.props.register({ username, password, rePassword, type })
	}

	backSite() {
		this.props.history.goBack();
	}

	render() {
		const data = this.state.data;
		const RadioItem = Radio.RadioItem;

		return (
			<form>
				{ this.props.redirectTo && <Redirect to={this.props.redirectTo}/> }
				<WingBlank>
					{ !!this.props.msg && <b>{this.props.msg}</b> }
					<WhiteSpace />
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
					<WhiteSpace />
					<InputItem 
						autoComplete="off"
						type="password" 
						clear="true"
						onChange={(val) => this.props.handleChange('rePassword', val)}
					>
						确认密码
					</InputItem>
					<WhiteSpace />
					<List>
					{data.map(i => (
							<RadioItem 
								onChange={() => this.props.handleChange('type', i.value)} 
								checked={i.value === this.props.state.type} 
								key={i.value}
							>
								{i.label}
							</RadioItem>
					))}
					</List>
					<WhiteSpace />
					<Button type="primary" onClick={() => this.submitRegister()}>确定注册</Button>
					<WhiteSpace />
					<Button type="ghost" onClick={() => this.backSite()}>返回</Button>
				</WingBlank>
			</form>
		)
	}
}

export default Register;