import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'
import axios from 'axios'

class AvatarSelect extends Component {
	static propTypes = {
		doSelectAvatar: PropTypes.func.isRequired,
		selectAvatarItem: PropTypes.string.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = {
			data: [],
		}
	}

	componentDidMount() {
		axios.get('/user/avatarlist')
			.then((res) => {
				var avatarList = res.data.map(v => {
					return {icon: require(`../img/${v}.png`), text: v}
				});
				this.setState({
					data: avatarList
				})
			})
	}

	renderDataItem(dataItem) {
		const selected = this.props.selectAvatarItem === dataItem.text
		return (
			<div style={{ 
						height: '100%',
						padding: '10px 0',
          	background: selected
          				? '#108ee9' 
          				: '#fff',
          	color: selected
          				? '#fff'
          				: '#000',
        }}>
          <img src={dataItem.icon} alt="" />
          <div>
            <span>{dataItem.text}</span>
          </div>
        </div>
      )
	}

	render() {
		
		return (
			<div>
				<List renderHeader={() => "头像选择"}>
					<Grid 
						data={this.state.data} 
						onClick={this.props.doSelectAvatar}
						columnNum={5}
						square={true}
						renderItem={(dataItem) => this.renderDataItem(dataItem)}
					/>

				</List>

			</div>
		)
	}
}

export default AvatarSelect;