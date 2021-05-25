import {eventChannel} from '@redux-saga/core'
import {
    call,
    cancel,
    cancelled,
    delay,
    fork,
    put,
    select,
    take,
    takeEvery,
} from '@redux-saga/core/effects'
import _ from 'lodash'
import message from './chatModules/message'
import user from './chatModules/user'

const token = (() => localStorage.getItem('token'))()
const io = require('socket.io-client')
export function* chat() {
    const socket = io('http://localhost:5000', {
        autoConnect: false,
        extraHeaders: {Authorization: `Bearer ${token}`},
    })
    yield takeEvery('CHAT:CONNECT', chatOn, socket)
    while (yield take('APP:CHAT:LAUNCH')) {
        const chatLaunch = yield fork(connect, socket) // запускаем подключение
        yield take('CHAT:DISCONNECT') // получаем действие дисконнект
        yield put({type: 'APP:CHAT:OFF'})
        yield cancel(chatLaunch) // отменям коннект
        yield delay(5000) // ждём 5 секунд
        yield call(connect, socket) // делаем переподключение
    }
}
function status(socket) {
    return new eventChannel((emitter) => {
        socket.on('connect', () => {
            emitter({type: 'CHAT:CONNECT'})
        })
        socket.on('disconnect', () => {
            emitter({type: 'CHAT:DISCONNECT'})
        })
        return () => {}
    })
}
function* connect(socket) {
    try {
        socket.connect()
        while (true) {
            const chatStatus = yield call(status, socket)
            yield put(yield take(chatStatus))
        }
    } finally {
        if (yield cancelled()) {
            socket.disconnect(true)
            yield put({type: 'APP:CHAT:RECONNECT'})
        }
    }
}

function* chatOn(socket) {
    yield call(user, socket)
    yield fork(message, socket)
    yield takeEvery('CHAT:PICK:DIALOG', pickDialog)
}
function* pickDialog({wid}) {
    const dialogs = yield select((state) => state.user.dialogs)
    const dialog = _.find(dialogs, {wid}) || null
    if (!dialog) {
        dialogs.push({_id: null, wid, messages: []})
        yield put({
            type: 'CHAT:CREATE:DIALOG',
            payload: dialogs,
        })
    }
    yield put({type: 'CHAT:SELECT:DIALOG', payload: wid})
}
