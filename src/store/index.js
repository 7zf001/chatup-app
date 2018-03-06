import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import reducer from './reducer'

let composeEnhancers = compose;

// 兼用ssr
if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) {
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
} 

const middleware = [ thunk ]

const store = createStore(reducer, 
	composeEnhancers(
		applyMiddleware(...middleware)
	)
);

export default store;