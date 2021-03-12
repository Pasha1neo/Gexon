import {call, fork, select, take, takeEvery} from 'redux-saga/effects'
import {authentification} from './app'
import {socket} from './socket'

export default function* rootSaga() {
    yield call(authentification)
    yield takeEvery('SOCKETON', socket)
}
