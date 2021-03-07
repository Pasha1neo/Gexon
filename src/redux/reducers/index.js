import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import authReducer from './authReducer'
import chatReducer from './chatReducer'
import appReducer from './appReducer'

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    form: formReducer,
    chat: chatReducer,
})
export default rootReducer
