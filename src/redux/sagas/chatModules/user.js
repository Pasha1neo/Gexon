import {eventChannel} from '@redux-saga/core'
import {take, put, call, fork, select} from 'redux-saga/effects'
import _ from 'lodash'

function users(state) {
    return [...state.user.users]
}

export default function* user(socket) {
    yield call(getUsers, socket)
    yield fork(watchUserStatus, socket)
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

function* watchUserStatus(socket) {
    const data = yield call(userStatus, socket)
    while (true) {
        const user = yield take(data)
        yield call(setStatus, user)
    }
}
function userStatus(socket) {
    return new eventChannel((emitter) => {
        socket.on('USER:CONNECTED', (user) => emitter(user))
        socket.on('USER:DISCONNECTED', (user) => emitter(user))
        return () => {}
    })
}
function* setStatus(data) {
    const usersData = yield select(users)
    const user = _.find(usersData, {_id: data._id})
    user.onlineStatus = data.onlineStatus
    if (data?.login) user.login = data.login
    if (data?.nickname) user.nickname = data.nickname
    if (data?.avatar) user.avatar = data.avatar
    yield put({type: 'USER:DATA:SET', payload: {users: usersData}})
}
