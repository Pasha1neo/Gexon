import {call, put, takeEvery} from '@redux-saga/core/effects'
import {profileAPI} from '../../api/api'

export function* profile() {
    yield takeEvery('PROFILE:ON', getPosts)
    yield takeEvery('POST:ADD', postAdd)
    yield takeEvery('USER:CHANGE:NICKNAME', setNickname)
    yield takeEvery('USER:UPLOAD:AVATAR', uploadAvatar)
}

function* uploadAvatar({newAvatar}) {
    const {avatar} = yield call(profileAPI.uploadAvatar, newAvatar)
    yield put({type: 'USER:SET:AVATAR', payload: `http://localhost:5000/${avatar}`})
}

function* postAdd({data}) {
    const {post} = yield call(profileAPI.addPost, data)
    yield put({type: 'PROFILE:ADD:POST', payload: post})
}

function* getPosts({userId}) {
    const {posts} = yield call(profileAPI.getPosts, userId)
    yield put({type: 'PROFILE:SET:POSTS', payload: posts})
}
function* setNickname({newNickname}) {
    const {nickname} = yield call(profileAPI.setNickname, newNickname)
    yield put({type: 'USER:SET:NICKNAME', nickname})
}
