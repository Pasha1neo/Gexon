import {END, eventChannel} from '@redux-saga/core'
import {take, put, call, fork, takeEvery, all, cancelled, cancel, select} from 'redux-saga/effects'
// export function* messageModule(socket) {
// yield call(watcherGetMessagesData, socket)
// yield fork(watcherGetMessage, socket)
// yield takeEvery('SENDMESSAGE', sendMessage, socket)
// yield takeEvery('SENDPRIVATEMESSAGE', sendPrivateMessage, socket)
// yield fork(getPrivateMessage, socket)
// }
// function* watcherGetMessage(socket) {
//     const message = yield call(getMessage, socket)
//     while (true) {
//         let action = yield take(message)
//         yield put(action)
//     }
// }
// function* getMessagesData(socket) {
//     return new eventChannel((emit) => {
//         socket.emit('upload_message', (data) => {
//             emit({
//                 type: 'GETMESSAGESDATA',
//                 payload: data,
//             })
//         })
//         return () => {}
//     })
// }
// function* sendMessage(socket, {message}) {
//     socket.emit('message', message)
// }
// function* getMessage(socket) {
//     return new eventChannel((emitter) => {
//         socket.on('message', (message) => {
//             emitter({
//                 type: 'GETMESSAGE',
//                 payload: message,
//             })
//         })
//         return () => {}
//     })
// }
// function* watcherGetMessagesData(socket) {
//     const data = yield call(getMessagesData, socket)
//     const action = yield take(data)
//     yield put(action)
//     yield socket.off('upload_message')
// }

//messageData: [{userID: 'userId', messagesData: [{mid: '1', message: 'Привет'}]}],
export function* messagesModule(socket) {
    yield takeEvery('SENDMESSAGE', watcherSendMessage, socket)
    yield all([
        // call(workerSendMessage, socket),
        call(workerGetMessagesData, socket),
        call(workerCheckNewMessage, socket),
    ])
}
// просто делаем запрос сервер сам понимает что тебе вернуть
//ПОЛУЧАЕМ = [{toUserID: [{mid, message}]}]
function* watcherGetMessagesData(socket) {
    return new eventChannel((emitter) => {
        socket.emit('getMessagesData', (data) => emitter(data))
        return () => {}
    })
}
function* workerGetMessagesData(socket) {
    const data = yield call(watcherGetMessagesData, socket)
    const payload = yield take(data)
    console.log(payload)
    yield put({type: 'GETMESSAGESDATA', payload})
}
// Это просто рассылка сообщений для вас
// ПОЛУЧАЕМ {toUserID: [{mid, message}]} получаем одно сообщение с id пользователя который написал это сообщение и дату сообщения
function* watcherCheckNewMessage(socket) {
    return new eventChannel((emitter) => {
        socket.on('newMessage', (msg) => emitter(msg))
        return () => {}
    })
}
function* workerCheckNewMessage(socket) {
    const message = yield call(watcherCheckNewMessage, socket)
    while (true) {
        const payload = yield take(message)
        console.log(payload)
        yield put({type: 'GETNEWMESSAGE', payload})
    }
}
// ОТПРАВЛЯЕМ = {toUserID:'кому', msg: 'сообщение'}
//логика на будующее такая что отправляться должны сообщения пачками и что не успевает кладётся в буффер
//плюс статус должен быть например ЧС, Ошибка отправки, статус ОК.
//как вариант можно сделать возврат сообщения себе КОЛБЕКОМ
function* watcherSendMessage(socket, {data}) {
    socket.emit('sendMessage', data)
}
