import {call, put, takeEvery, select} from '@redux-saga/core/effects'
import {profileAPI} from '../api/api'
import _ from 'lodash'
function getPosts(state) {
    return [...state.profile.posts]
}
export function* profile() {
    yield takeEvery('USER:CHANGE:NICKNAME', setNickname)
    yield takeEvery('USER:UPLOAD:AVATAR', uploadAvatar)
    yield takeEvery('USER:DELETE:POST', postDelete)
    yield takeEvery('PROFILE:CREATE:POST', postAdd)
}

function* postAdd({text, tid}) {
    const post = yield call(profileAPI.addPost, {text, tid})
    if (post) yield put({type: 'PROFILE:ADD:POST', payload: post})
    //сделать тип ошибки что ли
}
function* postDelete({pid}) {
    const data = yield call(profileAPI.deletePost, {pid})
    if (!data) return
    const posts = yield select(getPosts)
    _.remove(posts, {_id: data})
    yield put({type: 'PROFILE:DATA:SET', payload: {posts}})
    //сделать тип ошибки что ли да и что то не очень реализация но пока с пивком потянет
}
function* setNickname({newNickname}) {
    const nickname = yield call(profileAPI.setNickname, newNickname)
    if (nickname) {
        yield put({type: 'USER:DATA:SET', payload: nickname})
        yield put({type: 'PROFILE:DATA:SET', payload: nickname})
    }
    //сделать тип ошибки что ли
}
function* uploadAvatar({newAvatar}) {
    const avatar = yield call(profileAPI.uploadAvatar, newAvatar)
    if (avatar) {
        yield put({type: 'USER:DATA:SET', payload: {avatar}})
        yield put({type: 'PROFILE:DATA:SET', payload: {avatar}})
    }
    //сделать тип ошибки что ли
}
