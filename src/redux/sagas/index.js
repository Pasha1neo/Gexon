import {fork, call} from 'redux-saga/effects'
import {socket} from './socket'

export default function* rootSaga() {
    yield call(socket)
}
