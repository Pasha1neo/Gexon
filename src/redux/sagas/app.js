import {call, put, takeEvery} from '@redux-saga/core/effects'
import {signApi} from '../api/api'

export const setToken = (token) => localStorage.setItem('token', token)
export const removeToken = () => localStorage.removeItem('token')

export function* app() {
    yield put({type: 'APP:TURN:ON'})
    yield call(auth)
    yield takeEvery('SIGN:UP', signUp)
    yield takeEvery('SIGN:IN', signIn)
    yield takeEvery('SIGN:OUT', signOut)
}

function* auth() {
    const {user} = yield call(signApi.auth)
    if (!user) return removeToken()
    yield put({type: 'USER:DATA:SET', payload: user})
    yield put({type: 'APP:AUTH:SUCESS'})
    yield put({type: 'APP:STATUS:ON'})
}

function* signIn({login, password, rememberMe}) {
    const {token, user} = yield call(signApi.in, login, password, rememberMe)
    if (!user || !token) return alert('Ошибка авторизации')
    yield setToken(token)
    yield put({type: 'USER:DATA:SET', payload: user})
    yield put({type: 'APP:AUTH:SUCESS'})
    yield put({type: 'APP:STATUS:ON'})
}

function* signOut() {
    yield put({type: 'APP:STATUS:OFF'})
    yield put({type: 'APP:DATA:NULL'})
    yield put({type: 'APP:AUTH:FALSE'})
    yield removeToken()
    yield call(signApi.out)
}

function* signUp({login, email, password, password_2}) {
    if (password !== password_2) return window.alert('Пароли не совпали')
    const status = yield call(signApi.up, login, email, password)
    if (status) return window.alert('Успешно')
}
