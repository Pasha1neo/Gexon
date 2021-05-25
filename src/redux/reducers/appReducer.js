let initialState = {
    appStatus: false,
    authStatus: false,
    chatStatus: false,
}
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'APP:END:LAUNCH':
            return {
                ...state,
                appStatus: true,
            }
        case 'APP:AUTH:SUCESS':
            return {
                ...state,
                authStatus: true,
            }
        case 'APP:CHAT:ON':
            return {
                ...state,
                chatStatus: true,
            }
        case 'APP:CHAT:OFF':
            return {
                ...state,
                chatStatus: false,
            }
        default:
            return state
    }
}
export default appReducer
