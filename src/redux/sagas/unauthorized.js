import {call, put, takeEvery} from '@redux-saga/core/effects'
import {profileAPI} from '../api/api'

export function* unauthorized() {
    yield takeEvery('APP:GET:USER', getProfile)
    yield takeEvery('APP:GET:USERS', getUsers)
}
export function convertPostData(data) {
    return {
        userId: data._id,
        nickname: data?.nickname || data.login,
        avatar: data?.avatar,
        posts: data?.posts,
    }
}
function* getProfile({userId}) {
    const data = yield call(profileAPI.getProfile, userId)
    const convertedData = convertPostData(data)
    if (data && convertedData) yield put({type: 'PROFILE:DATA:SET', payload: convertedData})
    // сделать тип ошибки что ли
}
function* getUsers() {
    const data = yield call(profileAPI.getUsers)
    if (data) yield put({type: 'APP:USERS:SET', payload: data})
    // сделать тип ошибки что ли
}
