import {call, put, takeEvery} from '@redux-saga/core/effects'
import {profileAPI} from '../../api/api'

export function* profile() {
    yield takeEvery('USER:CREATE:POST', postAdd)
    yield takeEvery('USER:CHANGE:NICKNAME', setNickname)
    yield takeEvery('USER:UPLOAD:AVATAR', uploadAvatar)
}

function* postAdd({text}) {
    const post = yield call(profileAPI.addPost, text)
    if (post) yield put({type: 'USER:ADD:POST', payload: post})
    //сделать тип ошибки что ли
}

function* setNickname({newNickname}) {
    const nickname = yield call(profileAPI.setNickname, newNickname)
    if (nickname) yield put({type: 'USER:SET:NICKNAME', payload: nickname})
    //сделать тип ошибки что ли
}

function* uploadAvatar({newAvatar}) {
    const avatar = yield call(profileAPI.uploadAvatar, newAvatar)
    if (avatar) yield put({type: 'USER:SET:AVATAR', payload: avatar})
    //сделать тип ошибки что ли
}
