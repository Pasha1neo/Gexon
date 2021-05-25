import {call, put, takeEvery} from '@redux-saga/core/effects'
import {signApi} from '../../api/api'

export const setToken = (token) => localStorage.setItem('token', token)
export const removeToken = () => localStorage.removeItem('token')

export function* authentification() {
    yield takeEvery('APP:START:LAUNCH', appLaunch)
    yield takeEvery('SIGN:UP', signUp)
    yield takeEvery('SIGN:IN', signIn)
    yield takeEvery('SIGN:OUT', signOut)
}

function* appLaunch() {
    const authStatus = yield call(auth)
    if (!authStatus) removeToken()
    yield put({type: 'APP:END:LAUNCH'})
    yield put({type: 'APP:CHAT:LAUNCH'})
}

function* auth() {
    try {
        const data = yield call(signApi.auth)
        const {user} = data
        if (!user) return false
        yield put({
            type: 'USER:DATA:SET',
            payload: user,
        })
        yield put({type: 'APP:AUTH:SUCESS'})
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

function* signUp({login, email, password, password_2}) {
    if (password !== password_2) return alert('Пароли не совпали')
    const status = yield call(signApi.up, login, email, password)
    if (status) alert('Успешно')
}

function* signIn({login, password, rememberMe}) {
    const {token, user} = yield call(signApi.singin, login, password, rememberMe)
    if (user) {
        setToken(token || null)
        yield put({
            type: 'USER:DATA:SET',
            payload: user,
        })
        yield put({type: 'APP:AUTH:SUCESS'})
    }
}

function* signOut() {
    yield put({type: 'SOCKET:OFF'})
    removeToken()
    yield put({
        type: 'APP:LOGOUT',
        payload: {},
    })
}
