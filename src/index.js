import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import store from './store/index'

import './config'
import './index.css'

ReactDom.render(
	(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	),
	document.getElementById('root')
)

