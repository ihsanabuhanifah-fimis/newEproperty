

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import allReducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(allReducers,  composeEnhancers(applyMiddleware(thunk)))
export default store




// import {createStore, applyMiddleware} from 'redux'
// import thunk form 'redux-thunk'
// import authReducers from '../reducers/authReducers'


// let store = createStore(authReducers, applyMiddleware(thunk))

// export default store