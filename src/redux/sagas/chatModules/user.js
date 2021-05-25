import {eventChannel} from '@redux-saga/core'
import {take, put, call, fork, select} from 'redux-saga/effects'
import _ from 'lodash'

function getUsersData(state) {
    return [...state.chat.usersData]
}

export default function* user(socket) {
    yield call(getUsers, socket)
    // // yield fork(userStatus, socket)
}

function* getUsers(socket) {
    const data = yield call(usersData, socket)
    const payload = yield take(data)
    yield put({type: 'USER:DATA:SET', payload: {users: payload}})
}
function usersData(socket) {
    return new eventChannel((emitter) => {
        socket.emit('GET:DATA:USERS', (data) => emitter(data))
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
function getUserStatus(socket) {
    return new eventChannel((emitter) => {
        socket.on('USER:CONNECTED', (user) => emitter(user))
        socket.on('USER:DISCONNECTED', (user) => emitter(user))
        return () => {}
    })
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
