import {eventChannel} from '@redux-saga/core'
import {take, put, call, fork, takeEvery, all, cancelled, cancel, select} from 'redux-saga/effects'
import {messageModule} from './messageModule'
import {userModule} from './userModule'
const io = require('socket.io-client')
export function* socket() {
    const socket = io({autoConnect: false})
    yield takeEvery('SOCKETON', SocketConnect, socket)
    yield takeEvery('SOCKETOFF', SocketDisconnect, socket)
}
function* SocketDisconnect(socket) {
    socket.off('user connected')
    socket.off('user disconnected')
    socket.off('private message')
    socket.disconnect()
    yield put({type: 'SOCKETISDISCONNECTED'})
}
function* getSession(socket) {
    socket.on('session', ({sessionID, userID}) => {
        socket.auth = {sessionID}
        localStorage.setItem('sessionID', sessionID)
        socket.userID = userID
    })
    socket.off('session')
}

//воспользоваться штуками из книги (телефон)!!
//исправить проблему дублирования АЛЯ сделать доставание ключа из localstorage при перезагрузке что бы он подтверждал одну личность а не думал что это новый человек

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
function* SocketConnect(socket, {payload}) {
    const sessionID = localStorage.getItem('sessionID')
    socket.auth = {sessionID, username: payload}
    yield socket.connect()
    yield call(getSession, socket)
    const [...socketProcess] = yield all([
        call(connection, socket),
        call(userModule, socket),
        call(messageModule, socket),
    ])
    while (true) {
        yield take('SOCKETISDISCONNECTED')
        yield cancel(socketProcess)
    }
}
