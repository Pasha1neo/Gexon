import {call, put, takeEvery} from '@redux-saga/core/effects'
import {SignAPI} from '../../api/api'
export const getToken = () => localStorage.getItem('token')
export const setToken = (token) => localStorage.setItem('token', token)
export const removeToken = () => localStorage.removeItem('token')
export function* authentification() {
    yield takeEvery('APP:INIT:START', auth)
    yield takeEvery('SIGN:UP', registration)
    yield takeEvery('LOGIN', login)
    yield takeEvery('LOG:OUT', logout)
}
function* auth() {
    try {
        yield put({type: 'APP:INIT:PROCESS'})
        const tokens = getToken()
        const {user, token, resultcode, message} = yield call(SignAPI.auth, tokens)
        if (resultcode === 200) {
            yield setToken(token)
            yield put({
                type: 'USER:DATA:SET',
                payload: {
                    login: user.login,
                    userId: user.id,
                    email: user.email,
                    isAuth: true,
                    avatar: user.avatar ? `http://localhost:5000/${user.avatar}` : null,
                },
            })
            yield put({type: 'APP:INIT:END'})
            yield put({type: 'SOCKET:ON', payload: user.login})
            yield put({type: 'PROFILE:ON', payload: user.id})
        } else if (resultcode === 101) {
            yield put({type: 'APP:INIT:END'})
            removeToken()
        } else if (resultcode === 100) {
            console.log(message)
        }
    } catch (error) {
        //сделать здесь оффлайн режим
        yield put({type: 'APP:INIT:END'})
        removeToken()
        console.log('Ошибка в app саге')
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
    const {resultcode, token, user} = yield call(SignAPI.singin, login, password, rememberMe)
    if (resultcode === 200) {
        setToken(token)
        yield put({
            type: 'USER:DATA:SET',
            payload: {
                login: user.login,
                userId: user.id,
                email: user.email,
                isAuth: true,
                avatar: user.avatar ? `http://localhost:5000/${user.avatar}` : null,
            },
        })
        yield put({type: 'SOCKET:ON', payload: user.login})
        yield put({type: 'PROFILE:ON', payload: user.id})
    }
}

function* logout() {
    yield put({type: 'SOCKET:OFF'})
    removeToken()
    yield put({
        type: 'USER:DATA:SET',
        payload: {login: null, userId: null, email: null, isAuth: false},
    })
}
