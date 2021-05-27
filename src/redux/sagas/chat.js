import io from 'socket.io-client'
import {eventChannel} from '@redux-saga/core'
import {call, cancel, cancelled, fork, put, take} from '@redux-saga/core/effects'
import message from './chatModules/message'
import user from './chatModules/user'
export function* chat() {
    try {
        // const socket = io(`http://${window.location.hostname}:5000/`, {
        //     autoConnect: false,
        //     extraHeaders: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        // })
        const socket = io(`https://project-adaptive-server.herokuapp.com`, {
            autoConnect: false,
            extraHeaders: {Authorization: `Bearer ${localStorage.getItem('token')}`},
        })
        const chatLaunch = yield fork(connect, socket)
        while (yield take('CHAT:STATUS:ON')) {
            const userModule = yield fork(user, socket)
            const messageModule = yield fork(message, socket)
            yield take('CHAT:STATUS:OFF')
            socket.disconnect(true)
            yield cancel([chatLaunch, userModule, messageModule])
        }
    } finally {
        if (yield cancelled()) yield put({type: 'APP:CHAT:OFF'})
    }
}
function* connect(socket) {
    socket.connect()
    while (true) {
        const chatStatus = yield call(status, socket)
        yield put(yield take(chatStatus))
    }
}
function status(socket) {
    return new eventChannel((emitter) => {
        socket.on('connect', () => {
            emitter({type: 'CHAT:STATUS:ON'})
        })
        socket.on('disconnect', () => {
            emitter({type: 'CHAT:STATUS:OFF'})
        })
        return () => {}
    })
}
