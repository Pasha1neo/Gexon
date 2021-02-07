const SETUSERDATA = 'SETUSERDATA'
let initialState = {
    userId: null,
    email: null,
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

export const login = (email, password) => (dispatch) => {
    if (email === 'pasha1neo@mail.ru' && password === 'sD4NnpA3zXD2L9k') {
        dispatch(auth(email))
    }
}

export const auth = (email) => (dispatch) => {
    dispatch(setAuthUserData('1', email, 'pasha1neo', true))
}

export const setAuthUserData = (userId, email, nickname, isAuth) => ({
    type: SETUSERDATA,
    payload: {userId, email, nickname, isAuth},
})
export const logout = () => (dispatch) => {
    dispatch(setAuthUserData(null, null, null, false))
}
export default authReducer
