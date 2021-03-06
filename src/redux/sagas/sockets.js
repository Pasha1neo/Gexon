import {take, put, call, fork} from 'redux-saga/effects'
import io from 'socket.io-client'

function connect() {
    return io()
}
export function* flow() {
    const socket = yield call(connect)
    console.log(socket)
}

function workerGetMessage(socket) {}
function workerGetMessagesData(socket) {}
function workerSendmESSAGE(socket, login, userId, message) {
    socket.emit('message', {
        login,
        userId,
        message,
    })
}
function disconnect(socket) {}

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
