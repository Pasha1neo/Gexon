let initialState = {
    appStatus: false,
    authStatus: false,
    chatStatus: false,
}
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'APP:TURN:ON':
            return {
                ...state,
                appStatus: true,
            }
        case 'APP:AUTH:SUCESS':
            return {
                ...state,
                authStatus: true,
            }
        case 'APP:AUTH:FALSE': {
            return {
                ...state,
                authStatus: false,
            }
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
