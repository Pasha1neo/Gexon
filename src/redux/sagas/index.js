import {cancel, fork, take} from '@redux-saga/core/effects'
import {app} from './app'
import {chat} from './chat'
import {profile} from './profile'
import {user} from './user'
import {unauthorized} from './unauthorized'

export default function* rootSaga() {
    yield fork(app)
    yield fork(unauthorized)
    while (yield take('APP:STATUS:AUTHORIZED')) {
        const profileModule = yield fork(profile)
        const userModule = yield fork(user)
        const chatModule = yield fork(chat)
        yield take('APP:STATUS:UNAUTHORIZED')
        yield cancel([profileModule, chatModule, userModule])
    }
}
