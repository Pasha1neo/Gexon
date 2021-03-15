import {call, put, takeEvery} from '@redux-saga/core/effects'
import {SignAPI} from '../../api/api'
export const getToken = () => localStorage.getItem('token')
export const setToken = (token) => localStorage.setItem('token', token)
export const removeToken = () => localStorage.removeItem('token')

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
            type: 'SETUSERDATA',
            payload: {login: user.login, userId: user.id, email: user.email, isAuth: true},
        })
        yield put({type: 'SOCKETON', payload: user.login})
    }
}
function* auth() {
    try {
        yield put({type: 'INITSTART'})
        const tokens = getToken()
        const {user, token, resultcode, message} = yield call(SignAPI.auth, tokens)
        if (resultcode === 200) {
            setToken(token)
            yield put({
                type: 'SETUSERDATA',
                payload: {login: user.login, userId: user.id, email: user.email, isAuth: true},
            })
            yield put({type: 'CHECKTOKEN', payload: true})
            yield put({type: 'INITEND'})
            yield put({type: 'SOCKETON', payload: user.login})
        } else if (resultcode === 101) {
            yield put({type: 'INITEND'})
            removeToken()
        } else if (resultcode === 100) {
            console.log(message)
        }
    } catch (error) {
        //сделать здесь оффлайн режим
        yield put({type: 'INITEND'})
        removeToken()
        console.log('Ошибка сервера')
    }
}
function* logout() {
    yield put({type: 'SOCKETOFF'})
    removeToken()
    yield put({
        type: 'SETUSERDATA',
        payload: {login: null, userId: null, email: null, isAuth: false},
    })
}
export function* authentification() {
    yield takeEvery('REGISTRATION', registration)
    yield takeEvery('LOGIN', login)
    yield takeEvery('INITAPP', auth)
    yield takeEvery('LOGOUT', logout)
}
