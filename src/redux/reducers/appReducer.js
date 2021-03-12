let initialState = {
    login: null,
    userId: null,
    email: null,
    isAuth: false,
    initialized: false,
}
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INITSTART':
            return {
                ...state,
                initialized: false,
            }
        case 'INITEND':
            return {
                ...state,
                initialized: true,
            }
        case 'SETUSERDATA':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}
export default appReducer
