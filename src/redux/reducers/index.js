import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import chatReducer from './chatReducer'
import appReducer from './appReducer'
import profileReducer from './profileReducer'
const rootReducer = combineReducers({
    app: appReducer,
    form: formReducer,
    chat: chatReducer,
    profile: profileReducer,
})
export default rootReducer
