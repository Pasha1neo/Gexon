import {eventChannel} from '@redux-saga/core'
import {take, put, call, fork, takeEvery, all} from 'redux-saga/effects'
const io = require('socket.io-client')

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

function* disconnect(socket) {
    socket.off('message')
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

export function* socket() {
    try {
        const socket = io()
        yield fork(connection, socket)
        yield call(workerGetMessagesData, socket)
        yield fork(workerGetMessage, socket)
        yield fork(workerSendMessage, socket)
        yield takeEvery('DISCONNECT', disconnect, socket)
    } catch (error) {
        console.log(error)
    }
}
