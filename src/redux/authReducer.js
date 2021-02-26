import {SignAPI} from '../api/api'

const SETUSERDATA = 'SETUSERDATA'
let initialState = {
    // userId: null,
    // email: null,
    nickname: null,
    isAuth: false,
    avatar: '',
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

export const login = (nickname, password) => async (dispatch) => {
    const response = await SignAPI.singin(nickname, password)
    if (response.data.resultCode === 0) {
        dispatch(auth(nickname))
    }
}
export const registration = (nickname, password) => async (dispatch) => {
    const response = await SignAPI.signup(nickname, password)
    if (response.data.resultCode === 0) {
        dispatch(auth(nickname))
    }
}
export const auth = (nickname) => (dispatch) => {
    dispatch(setAuthUserData(nickname, true))
}
export const setAuthUserData = (nickname, isAuth) => ({
    type: SETUSERDATA,
    payload: {nickname, isAuth},
})
export const logout = () => (dispatch) => {
    dispatch(setAuthUserData(null, false))
}
export default authReducer
