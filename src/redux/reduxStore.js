import {applyMiddleware, combineReducers, createStore} from 'redux'
import authReducer from './authReducer'
import registrationReducer from './registrationReducer'
import thunkMiddleware from 'redux-thunk'
import {reducer as formReducer} from 'redux-form'

let reducers = combineReducers({
    auth: authReducer,
    registration: registrationReducer,
    form: formReducer,
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store
