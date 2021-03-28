let initialState = {
    login: null,
    userId: null,
    email: null,
    isAuth: false,
    appReady: false,
    chatReady: false,
}
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'APP:INIT:PROCESS':
            return {
                ...state,
                appReady: false,
            }
        case 'APP:INIT:END':
            return {
                ...state,
                appReady: true,
            }
        case 'USER:DATA:SET':
            return {
                ...state,
                ...action.payload,
            }
        case 'CHATREADY':
            return {
                ...state,
                chatReady: true,
            }
        default:
            return state
    }
}
export default appReducer
