import {eventChannel} from '@redux-saga/core'
import {take, put, call, fork, takeEvery} from 'redux-saga/effects'
import io from 'socket.io-client'

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
function* disconnect(socket) {
    socket.off('message')
}

export function* socket() {
    try {
        const socket = io()
        yield fork(watcherConnect, socket)
        yield fork(watcherConnectOff, socket)
        yield call(workerGetMessagesData, socket)
        yield fork(workerGetMessage, socket)
        yield fork(workerSendMessage, socket)
        yield takeEvery('DISCONNECT', disconnect, socket)
    } catch (error) {
        console.log(error)
    }
}

function* watcherConnect(socket) {
    const connect = yield call(connectOn, socket)
    while (true) {
        let connection = yield take(connect)
        yield put(connection)
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
function* watcherConnectOff(socket) {
    const connect = yield call(connectOff, socket)
    while (true) {
        let connection = yield take(connect)
        yield put(connection)
    }
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
