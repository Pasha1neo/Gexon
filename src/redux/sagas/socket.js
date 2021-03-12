import {eventChannel} from '@redux-saga/core'
import {take, put, call, fork, takeEvery, all, cancelled, cancel} from 'redux-saga/effects'
const io = require('socket.io-client')
function* testfn() {
    while (true) {
        yield take('TESTFN')
        console.log('test')
    }
}
function* getMessage(socket) {
    return new eventChannel((emitter) => {
        socket.on('message', (message) => {
            emitter({
                type: 'GETMESSAGE',
                payload: message,
            })
        })
        return () => {}
    })
}
function* workerGetMessage(socket) {
    const message = yield call(getMessage, socket)
    while (true) {
        let action = yield take(message)
        yield put(action)
    }
}
function* sendMessage(socket, message) {
    socket.emit('message', message)
}
function* workerSendMessage(socket) {
    while (true) {
        const {message} = yield take('SENDMESSAGE')
        yield call(sendMessage, socket, message)
    }
}
function* connection(socket) {
    while (true) {
        const [connectsOn, connectsOFF] = yield all([
            call(connectOn, socket),
            call(connectOff, socket),
        ])
        yield put(yield take(connectsOFF))
        yield put(yield take(connectsOn))
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
        socket.on('connect_error', (error) => {
            emitter({
                type: 'CONNECTIONFALSE',
            })
        })
        return () => {}
    })
}
function* getMessagesData(socket) {
    return new eventChannel((emit) => {
        socket.emit('upload_message', (data) => {
            emit({
                type: 'GETMESSAGESDATA',
                payload: data,
            })
        })
        return () => {}
    })
}
function* workerGetMessagesData(socket) {
    const data = yield call(getMessagesData, socket)
    const action = yield take(data)
    yield put(action)
}
function* SocketDisconnect(socket) {
    socket.disconnect()
    yield put({type: 'SOCKETISDISCONNECTED'})
}
function* SocketConnect(socket) {
    socket.connect()
    const [...socketProcess] = yield all([
        fork(connection, socket),
        fork(workerGetMessagesData, socket),
        fork(workerGetMessage, socket),
        fork(workerSendMessage, socket),
    ])
    while (true) {
        yield take('SOCKETISDISCONNECTED')
        yield cancel(socketProcess)
    }
}
export function* socket() {
    const socket = io({autoConnect: false})
    yield takeEvery('SOCKETON', SocketConnect, socket)
    yield takeEvery('SOCKETOFF', SocketDisconnect, socket)
}
export function* socketConnect() {}
