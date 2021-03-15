import {eventChannel} from '@redux-saga/core'
import {take, put, call, fork, takeEvery, all, cancelled, cancel, select} from 'redux-saga/effects'

function* getUsers(socket) {
    return new eventChannel((emitter) => {
        socket.emit('upload_users', (users) => {
            emitter({
                type: 'GETUSERSDATA',
                payload: users,
            })
        })
        return () => {}
    })
}
function* watcherGetUsers(socket) {
    const users = yield call(getUsers, socket)
    const action = yield take(users)
    yield put(action)
    yield socket.off('users')
}

function* getUserConnected(socket) {
    const state = yield select()
    return new eventChannel((emitter) => {
        socket.on('user connected', (newUser) => {
            if (
                !(
                    state.chat.usersData.find((element) => {
                        if (newUser.key === element.key) {
                            return true
                        }
                    }) && true
                ) ||
                false
            ) {
                emitter({
                    type: 'USERCONNECTED',
                    payload: newUser,
                })
            }
        })
        return () => {}
    })
}
function* watcherUserConnected(socket) {
    const user = yield call(getUserConnected, socket)
    while (true) {
        let action = yield take(user)
        yield put(action)
    }
}

function* watcherSetUserStatus(socket) {
    const data = yield call(setUserStatus, socket)
    while (true) {
        const userID = yield take(data)
        const state = yield select()
        const newUsersData = state.chat.usersData.map((elem) =>
            elem.key === userID ? {...elem, ...(elem.value.connected = false)} : elem
        )
        yield put({
            type: 'SETUSERSTATUSDISCONNECTED',
            usersData: newUsersData,
        })
    }
}
function* setUserStatus(socket) {
    return new eventChannel((emitter) => {
        socket.on('user disconnected', (userID) => {
            emitter(userID)
        })
        return () => {}
    })
}

export function* userModule(socket) {
    yield call(watcherGetUsers, socket)
    yield fork(watcherUserConnected, socket)
    yield call(watcherSetUserStatus, socket)
}
