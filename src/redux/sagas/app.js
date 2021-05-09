import {call, put, takeEvery} from '@redux-saga/core/effects'
import {SignAPI} from '../../api/api'

export const setToken = (token) => localStorage.setItem('token', token)
export const removeToken = () => localStorage.removeItem('token')

export function* authentification() {
    yield takeEvery('APP:INIT:START', auth)
    yield takeEvery('SIGN:UP', registration)
    yield takeEvery('LOGIN', login)
    yield takeEvery('LOG:OUT', logout)
    yield takeEvery('APP:TOKEN:REFRESH', refreshToken)
}
function* refreshToken() {}
function* auth() {
    try {
        yield put({type: 'APP:INIT:PROCESS'})
        const data = yield call(SignAPI.auth)
        if (!data) return yield put({type: 'APP:INIT:END'})
        const {resultcode, user, message} = data
        if (resultcode === 200) {
            yield put({
                type: 'USER:DATA:SET',
                payload: {
                    userId: user.id,
                    login: user.login,
                    nickname: user?.nickname,
                    email: user.email,
                    isAuth: true,
                    avatar: user.avatar ? `http://localhost:5000/${user.avatar}` : null,
                },
            })
            yield put({type: 'APP:INIT:END'})
            yield put({type: 'SOCKET:ON', payload: user.login})
            yield put({type: 'PROFILE:ON', userId: user.id})
        }
        if (resultcode === 101) {
            yield put({type: 'APP:INIT:END'})
            removeToken()
        }
    } catch (error) {
        console.log(error)
        yield put({type: 'APP:INIT:END'})
        removeToken()
    }
}

function* registration({login, email, password, password_2}) {
    if (password !== password_2) {
        alert('пароли не совпадают')
    } else {
        const response = yield call(SignAPI.signup, login, email, password)
        if (response.data.resultcode === 200) {
            alert('успешная регистрация')
        }
    }
}

function* login({login, password, rememberMe}) {
    const {token, user} = yield call(SignAPI.singin, login, password, rememberMe)
    setToken(token || null)
    yield put({
        type: 'USER:DATA:SET',
        payload: {
            userId: user.id,
            login: user.login,
            nickname: user.nickname,
            email: user.email,
            isAuth: true,
            posts: user.posts,
            avatar: user.avatar ? `http://localhost:5000/${user.avatar}` : null,
        },
    })
    yield put({type: 'SOCKET:ON', payload: user.login})
    yield put({type: 'PROFILE:ON', userId: user.id})
}

function* logout() {
    yield put({type: 'SOCKET:OFF'})
    removeToken()
    yield put({
        type: 'USER:DATA:SET',
        payload: {
            login: null,
            nickname: null,
            userId: null,
            email: null,
            isAuth: false,
            avatar: null,
            appReady: true,
            chatReady: false,
        },
    })
}
