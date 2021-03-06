import {eventChannel} from '@redux-saga/core'
import {take, put, call, fork, takeEvery} from 'redux-saga/effects'
import io from 'socket.io-client'

function connect() {
    return io('https://project-adaptive-server.herokuapp.com')
}
function* workerGetMessage(socket) {
    const message = yield call(getMessage, socket)
    while (true) {
        /*
			посмотреть https://ru.redux-saga.js.org/soderzhanie/advanced/futureactions
		*/
        let action = yield take(message)
        yield put(action)
    }
}

function* getMessage(socket) {
    return new eventChannel((emit) => {
        socket.on('message', (message) => {
            return emit({
                type: 'GETMESSAGE',
                payload: message,
            })
        })
        return () => {}
    })
}
function* sendMessage(socket, message) {
    socket.emit('message', message)
}
function* sendMessageFlow(socket) {
    while (true) {
        const {message} = yield take('SENDMESSAGE')
        yield call(sendMessage, socket, message)
    }
}
function* workerGetMessagesData(socket) {
    const data = yield call(getMessagesData, socket)
    while (true) {
        const action = yield take(data)
        yield put(action)
    }
}

function* getMessagesData(socket) {
    return new eventChannel((emit) => {
        socket.emit('upload_message', (data) => {
            return emit({
                type: 'GETMESSAGESDATA',
                payload: data,
            })
        })
        return () => {}
    })
}

export function* flow() {
    const socket = yield call(connect)
    yield fork(workerGetMessagesData, socket)
    yield fork(workerGetMessage, socket)
    yield fork(sendMessageFlow, socket)
}

// //Добавить к воркеру watcher который следит за экшеном отправки сообщения
// //использовать takeEvery(SENDMESSAGE, workerSendMessage)
// function workerSendMessage(socket, login, userId, message) {
//     socket.emit('message', {
//         login,
//         userId,
//         message,
//     })
// }
// function disconnect(socket) {}

/*
uploads() { Загрузка сообщений 
socket.emit('upload_message', (data) => {
    uploadMessages(data)
})
}
получение сообщений при монтировании компоненты
uploads()
socket.on('message', (message) => {
addMessage(message)}
отправка сообщения
socket.emit('message', {
    login,
    userId,
    message,
})
отключение сокета
componentWillUnmount() {
socket.off('message')
}
*/

/*
//КОНЦЕПЦИЯ КОТОРАЯ ПОЗВОЛИТ МНЕ ОТПРАВЛЯТЬ СООБЩЕНИЯ
function* authorize(user, password) {
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
    return token
}

function* loginFlow() {
  while (true) {
    const {user, password} = yield take('LOGIN_REQUEST')
    const token = yield call(authorize, user, password)
    if (token) {
      yield call(Api.storeItem, {token})
      yield take('LOGOUT')
      yield call(Api.clearItem, 'token')
    }
  }
}

*/
