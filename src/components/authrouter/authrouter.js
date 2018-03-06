import { Component } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadinfo } from '../../store/reducers/user'

@withRouter
@connect(
	state => state,
	{ loadinfo }
)

class AuthRouter extends Component {
	componentDidMount() {
		const pulicList = ['/login', '/register'];
		const pathname = this.props.history.location.pathname;
		if (pulicList.indexOf(pathname) === -1) {
			axios.get('/user/info')
				.then( res => {
					if (res.status === 200) {
						if (res.data.code === 0) {
							this.props.loadinfo(res.data.data)
						} else {
							this.props.history.push('/login')
						}
					}
				})
		}
	}

	render() {
		return null
	}
}

export default AuthRouter;