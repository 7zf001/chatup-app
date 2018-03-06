import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

@withRouter

class NavLink extends Component {
	static propTypes = {
		data: PropTypes.array.isRequired,
	}

	render() {
		const data = this.props.data.filter( v => !v.hide)
		const pathname = this.props.location.pathname

		return (
			<TabBar>
				{data.map( v => (
					<TabBar.Item 
						key={v.path}
						title={v.text}
						icon={{uri: require(`./img/${v.icon}.png`)}}
						selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
						selected={pathname === v.path}
						badge={v.badgeCount}
						onPress={ () => {
							this.props.history.push(v.path)
						}}
					/>
				))}
			</TabBar>
		)
	}
}

export default NavLink