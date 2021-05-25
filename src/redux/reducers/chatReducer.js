let initialState = {
    users: null,
    dialogs: null,
    wid: null,
}
const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET:DATA:USERS':
            return {
                ...state,
                users: action.payload,
            }
        case 'SET:DATA:DIALOGS':
            return {
                ...state,
                dialogs: action.payload,
            }
        case 'SET:DIALOG:WID':
            return {
                ...state,
                wid: action.payload,
            }
        case 'SET:DIALOG':
            return {
                ...state,
                dialogs: [...state.dialogs, action.payload],
            }
        default:
            return state
    }
}
export default chatReducer
