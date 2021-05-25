import {fork} from 'redux-saga/effects'
import {authentification} from './app'
import {chat} from './chat'
import {profile} from './profile'
export default function* rootSaga() {
    yield fork(authentification)
    yield fork(profile)
    yield fork(chat)
}
