import {fork} from 'redux-saga/effects'
import {authentification} from './app'
import {socket} from './socket'
import {chat} from './chat'
import {profile} from './profile'
export default function* rootSaga() {
    yield fork(authentification)
    yield fork(socket)
    yield fork(chat)
    yield fork(profile)
}
