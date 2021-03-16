import {combineReducers} from 'redux'
import authReducers from './Auth/reducers'


let allReducers = combineReducers({
    auth : authReducers,
   
})

export default allReducers