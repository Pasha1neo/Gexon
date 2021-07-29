import {call, put, takeEvery, select} from '@redux-saga/core/effects'
import {userAPI} from '../api/api'
import _ from 'lodash'

function getPosts(state) {
    return [...state.profile.posts]
}
export function* user() {
    yield takeEvery('USER:ADD:FRIEND', addFriend)
    yield takeEvery('USER:REMOVE:FRIEND', removeFriend)
    yield takeEvery('USER:GET:FRIENDS', getFriends)
}
function* addFriend({fid}) {
    const data = yield call(userAPI.addAsFriends, {fid})
    console.log(data)
}
function* removeFriend({fid}) {
    const data = yield call(userAPI.removeFromFriends, {fid})
    console.log(data)
}
function* getFriends() {
    const data = yield call(userAPI.getFriends)
    yield put({type: 'USER:DATA:SET', payload: {friends: data}})
}
