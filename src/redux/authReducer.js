import {SignAPI} from '../api/api'

const SETUSERDATA = 'SETUSERDATA'
let initialState = {
    email: null,
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

export const login = (email, password) => async (dispatch) => {
    const response = await SignAPI.singin(email, password)
    if (response.data.resultCode === 0) {
        dispatch(auth(email))
    }
}
export const registration = (email, password) => async (dispatch) => {
    console.log(email, password)
    const response = await SignAPI.signup(email, password)
    if (response.data.resultCode === 0) {
        dispatch(auth(email))
    }
}
export const auth = (email) => (dispatch) => {
    dispatch(setAuthUserData(email, true))
}
export const setAuthUserData = (email, isAuth) => ({
    type: SETUSERDATA,
    payload: {email, isAuth},
})
export const logout = () => (dispatch) => {
    dispatch(setAuthUserData(null, false))
}
export default authReducer
