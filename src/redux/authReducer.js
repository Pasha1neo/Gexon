import {SignAPI} from '../api/api'
import {initializedSuccess, isLocalToken} from './appReducer'
const SETUSERDATA = 'SETUSERDATA'
let initialState = {
    login: null,
    userId: null,
    email: null,
    isAuth: false,
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SETUSERDATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
export const setToken = (token) => localStorage.setItem('token', token)
export const getToken = () => localStorage.getItem('token')
export const removeToken = () => localStorage.removeItem('token')

export const registration = (login, email, password, password_2) => (dispatch) => {
    try {
        if (password !== password_2) {
            alert('пароли не совпадают')
        }
        const response = SignAPI.signup(login, email, password)
        if (response.data.resultcode === 200) {
            alert('успешная регистрация')
        }
    } catch (error) {
        console.log(error)
    }
}
export const login = (login, password, rememberMe) => async (dispatch) => {
    console.log(login, password, rememberMe)
    try {
        const {resultcode, token, user} = await SignAPI.singin(login, password, rememberMe)
        if (resultcode === 200) {
            setToken(token)
            dispatch(setAuthUserData({...user, isAuth: true}))
        }
    } catch (error) {
        console.log(error)
    }
}
export const logout = () => (dispatch) => {
    removeToken()
    dispatch(setAuthUserData({login: null, userId: null, email: null, isAuth: false}))
}

export const auth = () => async (dispatch) => {
    try {
        const localToken = getToken()
        const {user, token, resultcode} = await SignAPI.auth(localToken)
        if (resultcode === 200) {
            setToken(token)
            dispatch(setAuthUserData({...user, isAuth: true}))
            dispatch(isLocalToken(!!localToken))
            dispatch(initializedSuccess())
        } else {
            // необходимо сделать обработку ошибки о аутентификации
            removeToken()
        }
    } catch (error) {
        console.log(error)
    }
}

export const setAuthUserData = ({login, id, email, isAuth}) => ({
    type: SETUSERDATA,
    payload: {login, userId: id, email, isAuth},
})

export default authReducer
