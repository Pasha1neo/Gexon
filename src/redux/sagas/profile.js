import {call, put, select, takeEvery} from '@redux-saga/core/effects'

import {PostAPI, FileAPI} from '../../api/api'
export const getToken = () => localStorage.getItem('token')
export function* profile() {
    yield takeEvery('PROFILE:ON', getPosts)
    yield takeEvery('POST:ADD', postAdd)
    yield takeEvery('USER:UPLOAD:AVATAR', uploadAvatar)
}

function* postAdd({data}) {
    yield call(PostAPI.addPost, data)
    yield put({type: 'PROFILE:ADD:POST', payload: {postText: data.text, authorName: data.name}})
}

function* getPosts({payload}) {
    const {
        data: {resultcode, posts},
    } = yield call(PostAPI.getPosts, payload)
    if (resultcode === 200) {
        yield put({type: 'PROFILE:SET:POSTS', payload: posts})
    }
}
function* uploadAvatar({avatar}) {
    const token = yield getToken()
    const {data} = yield call(FileAPI.uploadAvatar, avatar, token)
    yield put({type: 'USER:SET:AVATAR', payload: `http://localhost:5000/${data.payload}`})
}
