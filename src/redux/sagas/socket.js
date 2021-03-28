import {eventChannel} from '@redux-saga/core'
import {take, put, call, fork, takeEvery, all, cancelled, cancel, select} from 'redux-saga/effects'
import {messageModule} from './socket/messageModule'
import {userModule} from './socket/userModule'

const io = require('socket.io-client')
export function* socket() {
    const socket = io({autoConnect: false})
    yield takeEvery('SOCKET:OFF', SocketDisconnect, socket)
    yield takeEvery('SOCKET:ON', SocketConnect, socket)
}
function* SocketDisconnect(socket) {
    socket.off('user connected')
    socket.off('user disconnected')
    socket.off('private message')
    socket.disconnect()
}
function* SocketConnect(socket, {payload}) {
    const sessionID = yield localStorage.getItem('sessionID')
    socket.auth = {sessionID, username: payload}
    yield socket.connect()
    yield call(getSession, socket)
    // yield fork(connection, socket)
    yield fork(userModule, socket)
    yield fork(messageModule, socket)
}
function* getSession(socket) {
    socket.on('session', ({sessionID, userID}) => {
        localStorage.setItem('sessionID', sessionID)
        socket.auth = {sessionID}
        socket.userID = userID
    })
}
function* connection(socket) {
    const [connectsOn, connectsOFF] = yield all([call(connectOn, socket), call(connectOff, socket)])
    while (true) {
        yield put(yield take(connectsOn))
        yield put(yield take(connectsOFF))
    }
}
function* connectOn(socket) {
    return new eventChannel((emitter) => {
        socket.on('connect', () => {
            emitter({
                type: 'CONNECTIONTRUE',
            })
        })
        return () => {}
    })
}
function* connectOff(socket) {
    return new eventChannel((emitter) => {
        socket.on('disconnect', () => {
            emitter({
                type: 'CONNECTIONFALSE',
            })
        })
        return () => {}
    })
}
