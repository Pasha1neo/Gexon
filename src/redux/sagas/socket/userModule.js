import {eventChannel} from '@redux-saga/core'
import {take, put, call, fork, takeEvery, select} from 'redux-saga/effects'
import _ from 'lodash'

function getUsersData(state) {
    return [...state.chat.usersData]
}

export function* userModule(socket) {
    yield call(watcherGetUsers, socket)
    yield fork(userConnect, socket)
    yield fork(userDisconnect, socket)
}

function* watcherGetUsers(socket) {
    const data = yield call(workerGetUsers, socket)
    const payload = yield take(data)
    yield put({type: 'USERS:DATA:GET', payload})
    yield socket.off('users')
}
function* workerGetUsers(socket) {
    return new eventChannel((emitter) => {
        socket.emit('GET:USERS', (data) => emitter(data))
        return () => {}
    })
}

function* userConnect(socket) {
    const data = yield call(getUserConnect, socket)
    while (true) {
        const user = yield take(data)
        const result = yield call(checkDublicate, user)
        yield put(result)
    }
}
//название сокета может быть неправильным
function* getUserConnect(socket) {
    return new eventChannel((emitter) => {
        socket.on('USER:CONNECTED', (user) => emitter(user))
        return () => {}
    })
}
function* checkDublicate(user) {
    const usersData = yield select(getUsersData)
    const result = _.find(usersData, {key: user.Key})
    if (result) {
        const payload = usersData.map((itemUser) => {
            if (itemUser.key === user.key) {
                return user
            } else {
                return itemUser
            }
        })
        return {
            type: 'USER:SET:STATUS',
            payload,
        }
    } else {
        return {
            type: 'USER:CONNECT',
            payload: user,
        }
    }
}

function* userDisconnect(socket) {
    const data = yield call(getUserDisconnect, socket)
    while (true) {
        const userID = yield take(data)
        const usersData = yield select(getUsersData)
        const payload = usersData.map((user) =>
            user.key === userID ? {...user, ...(user.value.connected = false)} : user
        )
        yield put({
            type: 'USER:SET:STATUS',
            payload,
        })
    }
}
//название сокета может быть неправильным
function* getUserDisconnect(socket) {
    return new eventChannel((emitter) => {
        socket.on('USER:DISCONNECTED', (user) => emitter(user))
        return () => {}
    })
}
