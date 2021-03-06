import {composeWithDevTools} from 'redux-devtools-extension'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {reducer as formReducer} from 'redux-form'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import authReducer from './authReducer'
import registrationReducer from './registrationReducer'
import appReducer from './appReducer'
import chatReducer from './chatReducer'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
    auth: authReducer,
    registration: registrationReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer,
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(sagaMiddleware, thunkMiddleware))
)

sagaMiddleware.run(sagas)

export default store
