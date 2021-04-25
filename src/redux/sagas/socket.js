import {eventChannel} from '@redux-saga/core'
import {take, put, call, fork, takeEvery} from 'redux-saga/effects'
import {messageModule} from './socket/messageModule'
import {userModule} from './socket/userModule'

const io = require('socket.io-client')
export function* socket() {
    const socket = io('http://localhost:5000', {autoConnect: false})
    yield takeEvery('SOCKET:OFF', SocketDisconnect, socket)
    yield takeEvery('SOCKET:ON', SocketConnect, socket)
}
function SocketDisconnect(socket) {
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
    yield fork(connection, socket)
    yield fork(userModule, socket)
    yield fork(messageModule, socket)
}
function getSession(socket) {
    socket.on('session', ({sessionID, userID}) => {
        localStorage.setItem('sessionID', sessionID)
        socket.auth = {sessionID}
        socket.userID = userID
    })
}
function chatConnection(socket) {
    return new eventChannel((emitter) => {
        socket.on('connect', () => emitter({type: 'CHAT:CONNECT'}))
        socket.on('disconnect', () => emitter({type: 'CHAT:DISCONNECT'}))
        return () => {}
    })
}
function* connection(socket) {
    const connection = yield call(chatConnection, socket)
    while (true) {
        yield put(yield take(connection))
    }
}
