import {applyMiddleware, combineReducers, createStore} from 'redux'
import authReducer from './authReducer'
import registrationReducer from './registrationReducer'
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'
import {composeWithDevTools} from 'redux-devtools-extension'
let reducers = combineReducers({
    auth: authReducer,
    registration: registrationReducer,
    form: formReducer,
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)))

window.store = store

export default store
