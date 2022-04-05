import {combineReducers} from 'redux'
import appReducer from './appreducer'
import userReducer from './userreducer'

const rootReducer = combineReducers({
    app: appReducer,
    user: userReducer,
})
export default rootReducer
