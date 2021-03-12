import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import chatReducer from './chatReducer'
import appReducer from './appReducer'

const rootReducer = combineReducers({
    app: appReducer,
    form: formReducer,
    chat: chatReducer,
})
export default rootReducer
