import _ from 'lodash'
import {eventChannel} from '@redux-saga/core'
import {take, put, call, fork, takeEvery, select} from '@redux-saga/core/effects'
function getDialogs(state) {
    return [...state.user.dialogs]
}
export default function* message(socket) {
    yield takeEvery('CHAT:MESSAGE:SEND', workerSendMessage, socket)
    yield call(getDialogsData, socket)
    yield fork(watchMessage, socket)
    yield put({type: 'APP:CHAT:ON'})
}
function* addMessageInDialog({message, dialog: {_id, wid}}) {
    console.log(message)
    const dialogs = yield select(getDialogs)
    let dialog = _.find(dialogs, {wid})
    if (!dialog) dialog = {_id, wid, messages: []}
    if (dialog._id === null) dialog._id = _id
    dialog.messages.push(message)
    yield put({type: 'CHAT:UPDATE:DIALOGS', payload: dialogs})
}
function* workerSendMessage(socket, {data}) {
    const res = yield call(sendMessage, socket, data)
    while (true) {
        const message = yield take(res)
        yield call(addMessageInDialog, message)
    }
}
function sendMessage(socket, data) {
    return new eventChannel((emitter) => {
        socket.emit('SEND:MESSAGE', data, (res) => {
            emitter(res)
        })
        return () => {}
    })
}

function* watchMessage(socket) {
    const data = yield call(getNewMessage, socket)
    while (true) {
        const res = yield take(data)
        yield call(addMessageInDialog, res)
    }
}
function getNewMessage(socket) {
    return new eventChannel((emitter) => {
        socket.on('NEW:MESSAGE', (data) => {
            emitter(data)
        })
        return () => {}
    })
}

function* getDialogsData(socket) {
    const data = yield call(dialogsData, socket)
    const payload = yield take(data)
    yield put({type: 'CHAT:UPDATE:DIALOGS', payload})
}
function dialogsData(socket) {
    return new eventChannel((emitter) => {
        socket.emit('GET:DATA:DIALOGS', (data) => emitter(data))
        return () => {}
    })
}

// function messageChane(socket, {wid, mid, message}) {
//     socket.emit('MESSAGE:CHANGE', wid, mid, message)
// }
// function getChangedMessage(socket) {
//     return new eventChannel((emitter) => {
//         socket.on('MESSAGE:CHANGED', (data) => emitter(data))
//         return () => {}
//     })
// }
// function* watcherGetChangedMessage(socket) {
//     const data = yield call(getChangedMessage, socket)
//     while (true) {
//         const {wid, mid, message} = yield take(data)
//         yield call(changeMessage, wid, mid, message)
//     }
// }
// function* changeMessage(wid, mid, message) {
//     const dialogsData = yield select(getDialogsData)
//     const dialog = _.find(dialogsData, {wid})
//     if (dialog) {
//         _.find(dialog.messages, {mid}).message = message
//         yield put({type: 'MESSAGE:GET:DATA', payload: dialogsData})
//     }
// }
// function messageRead(socket, {wid, mid}) {
//     socket.emit('MESSAGE:READ', wid, mid)
// }
// function getReadedMessage(socket) {
//     return new eventChannel((emitter) => {
//         socket.on('MESSAGE:READED', (data) => emitter(data))
//         return () => {}
//     })
// }
// function* watcherGetReadedMessage(socket) {
//     const data = yield call(getReadedMessage, socket)
//     while (true) {
//         const {wid, mid} = yield take(data)
//         yield call(readedMessage, wid, mid)
//     }
// }
// function* readedMessage(wid, mid) {
//     const dialogsData = yield select(getDialogsData)
//     const dialog = _.find(dialogsData, {wid})
//     if (dialog) {
//         _.find(dialog.messages, {mid}).read = true
//         yield put({type: 'MESSAGE:GET:DATA', payload: dialogsData})
//     }
// }
// function messageDelete(socket, {wid, mid}) {
//     socket.emit('MESSAGE:DELETE', wid, mid)
// }
// function getDeletedMessage(socket) {
//     return new eventChannel((emitter) => {
//         socket.on('MESSAGE:DELETED', (data) => emitter(data))
//         return () => {}
//     })
// }
// function* watcherDeletedMessage(socket) {
//     const data = yield call(getDeletedMessage, socket)
//     while (true) {
//         const {wid, mid} = yield take(data)
//         yield call(deleteMessage, wid, mid)
//     }
// }
// function* deleteMessage(wid, mid) {
//     const dialogsData = yield select(getDialogsData)
//     const dialog = _.find(dialogsData, {wid})
//     if (dialog) {
//         _.pullAllBy(dialog.messages, [{mid}], 'mid')
//         yield put({type: 'MESSAGE:GET:DATA', payload: dialogsData})
//     }
// }
