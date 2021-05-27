import {cancel, fork, take} from '@redux-saga/core/effects'
import {app} from './app'
import {chat} from './chat'
import {profile} from './profile'

export default function* rootSaga() {
    yield fork(app)
    while (yield take('APP:STATUS:ON')) {
        const profileModule = yield fork(profile)
        const chatModule = yield fork(chat)
        yield take('APP:STATUS:OFF')
        yield cancel([profileModule, chatModule])
    }
}
