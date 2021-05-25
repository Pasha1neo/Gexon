import {combineReducers} from 'redux'
import chatReducer from './chatReducer'
import appReducer from './appReducer'
import profileReducer from './profileReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    app: appReducer,
    // chat: chatReducer,
    // profile: profileReducer,
    user: userReducer,
})
export default rootReducer
