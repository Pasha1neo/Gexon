import {takeEvery} from 'redux-saga/effects'
import {socket} from './socket'

export default function* rootSaga() {
    yield takeEvery('CHATON', socket)
}
