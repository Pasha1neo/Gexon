import {eventChannel} from '@redux-saga/core'
import {take, put, call, fork, takeEvery, all, cancelled, cancel, select} from 'redux-saga/effects'

function* sendMessage(socket, {message}) {
    socket.emit('message', message)
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
function* watcherGetMessage(socket) {
    const message = yield call(getMessage, socket)
    while (true) {
        let action = yield take(message)
        yield put(action)
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
function* watcherGetMessagesData(socket) {
    const data = yield call(getMessagesData, socket)
    const action = yield take(data)
    yield put(action)
    yield socket.off('upload_message')
}
function* sendPrivateMessage(socket, {data}) {
    socket.emit('private message', {
        data,
    })
}
export function* messageModule(socket) {
    yield takeEvery('SENDMESSAGE', sendMessage, socket)
    yield takeEvery('SENDPRIVATEMESSAGE', sendPrivateMessage, socket)
    yield call(watcherGetMessagesData, socket)
    yield fork(watcherGetMessage, socket)
}
