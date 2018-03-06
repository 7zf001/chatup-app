import React, { Component } from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelect from '../../components/avatar-select/avatar-select'
import { update } from '../../store/reducers/user.js'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

@connect(
	state => state.userReducer,
	{ update }
)

class BossInfo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			avatar: '',
			company: '',
			money: '',
			desc: '',
		}
	}

	onChange(key, value) {
		this.setState({
			[key]: value
		})
	}

	doSelectAvatar({text}) {
		this.setState({
			avatar: text
		})
	}

	render() {
		const path = this.props.location.pathname
		const redirectTo = this.props.redirectTo

		return (
			<div>
				{ redirectTo && redirectTo !== path && <Redirect to={this.props.redirectTo}/> }
				<NavBar mode="drak">Boss完善信息</NavBar>
				<AvatarSelect 
					doSelectAvatar={val => this.doSelectAvatar(val)} 
					selectAvatarItem={this.state.avatar}
				/>
				<InputItem onChange={(val) => this.onChange('company',val)}>公司名称</InputItem>
				<InputItem onChange={(val) => this.onChange('title',val)}>招聘职位</InputItem>
				<InputItem onChange={(val) => this.onChange('money',val)}>薪资</InputItem>
				<TextareaItem 
					onChange={(val) => this.onChange('desc',val)}
					title="职位描述" 
					autoHeight 
					rows={5} 
					count={100} 
				/>
				<Button type="primary" onClick={() => {this.props.update(this.state)}}>保存</Button>
			</div>
		)
	}
}

export default BossInfo;