import {combineReducers} from 'redux'
import chatReducer from './chatReducer'
import appReducer from './appReducer'
import profileReducer from './profileReducer'
const rootReducer = combineReducers({
    app: appReducer,
    chat: chatReducer,
    profile: profileReducer,
})
export default rootReducer
