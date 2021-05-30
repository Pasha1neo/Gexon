import {combineReducers} from 'redux'
import appReducer from './appReducer'
import userReducer from './userReducer'
import profileReducer from './profileReducer'

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
    profile: profileReducer,
})
export default rootReducer
