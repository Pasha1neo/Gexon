import {call, cancel, fork, select, take, takeEvery} from 'redux-saga/effects'
import {authentification} from './app'
import {socket, socketConnect} from './socket/socket'

export default function* rootSaga() {
    yield fork(authentification)
    yield fork(socket)
}
