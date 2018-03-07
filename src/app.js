import React from 'react'
import AuthRouter from './components/authrouter/authrouter'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import Geniusinfo from './container/geniusinfo/geniusinfo'
import Dashboard from './container/dashboard/dashboard'
import Chat from './container/chat/chat'
import { Route, Switch } from 'react-router-dom'

class App extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			hasError: false
		}
	}

	/*componentDidCatch (error, info) {
		console.log(error, info)
		this.setState({hasError: true})
	}*/

	render () {
		return this.state.hasError 
		? <img className="errorimg" src={require('./error.png')} alt="error"/>
		: (
			<div>
				<AuthRouter />{/* 进入页面时运行验证 */}
				<Switch>
					<Route path="/geniusinfo" component={Geniusinfo} />
					<Route path="/bossinfo" component={BossInfo} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/chat/:user" component={Chat}/>
					<Route component={Dashboard}/>
				</Switch>
			</div>
		)
	}
}

export default App