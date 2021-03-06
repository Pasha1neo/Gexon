import {fork} from 'redux-saga/effects'
import {flow} from './sockets'

export default function* rootSaga() {
    yield fork(flow)
}
