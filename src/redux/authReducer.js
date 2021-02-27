import {SignAPI} from '../api/api'
import {initializedSuccess, isLocalToken} from './appReducer'
const SETUSERDATA = 'SETUSERDATA'
let initialState = {
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

export const registration = (email, password) => (dispatch) => {
    const response = SignAPI.signup(email, password)
    if (response.data.resultcode === 200) {
        alert('успешная регистрация')
    }
}
export const login = (email, password) => async (dispatch) => {
    try {
        const {resultcode, token, user} = await SignAPI.singin(email, password)
        if (resultcode === 200) {
            setToken(token)
            dispatch(setAuthUserData(user, true))
        }
    } catch (error) {}
}
export const logout = () => (dispatch) => {
    removeToken()
    dispatch(setAuthUserData({id: null, email: null}, false))
}

export const auth = () => async (dispatch) => {
    try {
        const localToken = getToken()
        const {user, token, resultcode} = await SignAPI.auth(localToken)
        if (resultcode === 200) {
            setToken(token)
            dispatch(setAuthUserData(user, true))
            dispatch(isLocalToken(!!localToken))
            dispatch(initializedSuccess())
        } else {
            // необходимо сделать обработку ошибки о аутентификации
            removeToken()
        }
    } catch (error) {}
}

export const setAuthUserData = ({id, email}, isAuth) => ({
    type: SETUSERDATA,
    payload: {id, email, isAuth},
})

export default authReducer
