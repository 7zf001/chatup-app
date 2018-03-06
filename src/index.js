import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AuthRouter from './components/authrouter/authrouter'
import store from './store/index'
import Login from './container/login/login'
import Register from './container/register/register'
import BossInfo from './container/bossinfo/bossinfo'
import Geniusinfo from './container/geniusinfo/geniusinfo'
import Dashboard from './container/dashboard/dashboard'
import Chat from './container/chat/chat'
import './config'
import './index.css'

ReactDom.render(
	(
		<Provider store={store}>
			<BrowserRouter>
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
			</BrowserRouter>
		</Provider>
	),
	document.getElementById('root')
)

