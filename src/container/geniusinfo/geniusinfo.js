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

class GeniusInfo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: '',
			avatar: '',
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
				<NavBar mode="drak">牛人完善信息</NavBar>
				<AvatarSelect 
					doSelectAvatar={val => this.doSelectAvatar(val)} 
					selectAvatarItem={this.state.avatar}
				/>
				<InputItem onChange={(val) => this.onChange('title',val)}>个人职位</InputItem>
				<TextareaItem 
					onChange={(val) => this.onChange('desc',val)}
					title="个人描述" 
					autoHeight 
					rows={5} 
					count={100} 
				/>
				<Button type="primary" onClick={() => {this.props.update(this.state)}}>保存</Button>
			</div>
		)
	}
}

export default GeniusInfo;