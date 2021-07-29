import {call, put, takeEvery} from '@redux-saga/core/effects'
import {profileAPI} from '../api/api'

export function* unauthorized() {
    yield takeEvery('APP:GET:USER', getProfile)
    yield takeEvery('APP:GET:USERS', getUsers)
}

function* getProfile({userId}) {
    const data = yield call(profileAPI.getProfile, userId)
    if (data) yield put({type: 'PROFILE:DATA:SET', payload: data})
    // сделать тип ошибки что ли
}
function* getUsers() {
    const data = yield call(profileAPI.getUsers)
    if (data) yield put({type: 'APP:USERS:SET', payload: data})
    // сделать тип ошибки что ли
}
