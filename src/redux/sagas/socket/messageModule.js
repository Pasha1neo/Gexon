import _ from 'lodash'
import {eventChannel} from '@redux-saga/core'
import {take, put, call, fork, takeEvery, all, select} from 'redux-saga/effects'
function getDialogsData(state) {
    return [...state.chat.dialogsData]
}
export function* messageModule(socket) {
    yield call(watcherGetMessagesData, socket)
    yield fork(watcherGetNewMessage, socket)
    yield fork(watcherGetChangedMessage, socket)
    yield fork(watcherGetReadedMessage, socket)
    yield takeEvery('MESSAGE:SEND', sendMessage, socket)
    yield takeEvery('MESSAGE:CHANGE', messageChane, socket)
    yield takeEvery('MESSAGE:READ', messageRead, socket)
}
function* watcherGetMessagesData(socket) {
    const data = yield call(getMessagesData, socket)
    const payload = yield take(data)
    yield put({type: 'MESSAGE:GET:DATA', payload})
    yield put({type: 'CHATREADY'})
}
function* getMessagesData(socket) {
    return new eventChannel((emitter) => {
        socket.emit('GET:MESSAGESDATA', (data) => emitter(data))
        return () => {}
    })
}
function* watcherGetNewMessage(socket) {
    const data = yield call(getNewMessage, socket)
    while (true) {
        const {wid, message} = yield take(data)
        yield call(newMessage, wid, message)
    }
}
function* getNewMessage(socket) {
    return new eventChannel((emitter) => {
        socket.on('NEW:MESSAGE', (data) => emitter(data))
        return () => {}
    })
}
function* newMessage(wid, message) {
    const dialogsData = yield select(getDialogsData)
    const dialog = _.find(dialogsData, {wid})
    if (dialog) {
        dialog.messages.push(message)
    } else {
        dialogsData.push({wid, users: [], messages: [message]})
    }
    yield put({type: 'MESSAGE:GET', payload: dialogsData})
}
function* sendMessage(socket, {data}) {
    socket.emit('SEND:MESSAGE', data)
}
function* messageChane(socket, {wid, mid, message}) {
    socket.emit('MESSAGE:CHANGE', wid, mid, message)
}
function* getChangedMessage(socket) {
    return new eventChannel((emitter) => {
        socket.on('MESSAGE:CHANGED', (data) => emitter(data))
        return () => {}
    })
}
function* watcherGetChangedMessage(socket) {
    const data = yield call(getChangedMessage, socket)
    while (true) {
        const {wid, mid, message} = yield take(data)
        yield call(changeMessage, wid, mid, message)
    }
}
function* changeMessage(wid, mid, message) {
    const dialogsData = yield select(getDialogsData)
    const dialog = _.find(dialogsData, {wid})
    if (dialog) {
        _.find(dialog.messages, {mid}).message = message
        yield put({type: 'MESSAGE:GET:DATA', payload: dialogsData})
    }
}
function* messageRead(socket, {wid, mid}) {
    socket.emit('MESSAGE:READ', wid, mid)
}
function* getReadedMessage(socket) {
    return new eventChannel((emitter) => {
        socket.on('MESSAGE:READED', (data) => emitter(data))
        return () => {}
    })
}
function* watcherGetReadedMessage(socket) {
    const data = yield call(getReadedMessage, socket)
    while (true) {
        const {wid, mid} = yield take(data)
        yield call(readedMessage, wid, mid)
    }
}
function* readedMessage(wid, mid) {
    const dialogsData = yield select(getDialogsData)
    const dialog = _.find(dialogsData, {wid})
    if (dialog) {
        _.find(dialog.messages, {mid}).read = true
        yield put({type: 'MESSAGE:GET:DATA', payload: dialogsData})
    }
}
