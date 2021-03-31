import {eventChannel} from '@redux-saga/core'
import {take, put, call, fork, takeEvery, select, race} from 'redux-saga/effects'
import _ from 'lodash'

function getUsersData(state) {
    return [...state.chat.usersData]
}

export function* userModule(socket) {
    yield call(watcherGetUsers, socket)
    yield fork(userStatus, socket)
}

function* watcherGetUsers(socket) {
    const data = yield call(workerGetUsers, socket)
    const payload = yield take(data)
    yield put({type: 'USER:SET:THIS', payload: _.find(payload, {userID: socket.userID})})
    yield put({type: 'USERS:DATA:GET', payload})
    yield socket.off('users')
}
function* workerGetUsers(socket) {
    return new eventChannel((emitter) => {
        socket.emit('GET:USERS', (data) => emitter(data))
        return () => {}
    })
}

function* getUserStatus(socket) {
    return new eventChannel((emitter) => {
        socket.on('USER:CONNECTED', (user) => emitter(user))
        socket.on('USER:DISCONNECTED', (user) => emitter(user))
        return () => {}
    })
}

function* userStatus(socket) {
    const data = yield call(getUserStatus, socket)
    while (true) {
        const user = yield take(data)
        const result = yield call(checkUsers, user)
        yield put(result)
    }
}
function* checkUsers(user) {
    const usersData = yield select(getUsersData)
    const result = _.find(usersData, {userID: user.userID})
    if (result) {
        const payload = usersData.map((u) => {
            if (user.userID === u.userID) {
                return {...u, connected: !u.connected}
            }
            return u
        })
        return {
            type: 'USER:SET:CONNECT',
            payload,
        }
    }
    return {
        type: 'USER:CONNECT',
        payload: user,
    }
}
