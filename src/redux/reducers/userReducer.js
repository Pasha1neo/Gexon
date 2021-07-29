let initialState = {
    userId: null,
    login: null,
    nickname: null,
    email: null,
    avatar: null,
    posts: [],
    users: [],
    friends: [],
    dialogs: [],
    wid: null,
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER:DATA:SET':
            return {
                ...state,
                ...action.payload,
            }
        case 'USER:ADD:POST':
            return {
                ...state,
                posts: [...state.posts, action.payload],
            }
        case 'CHAT:CREATE:DIALOG':
            return {
                ...state,
                dialogs: action.payload,
            }
        case 'CHAT:SELECT:DIALOG':
            return {
                ...state,
                wid: action.payload,
            }
        case 'CHAT:UPDATE:DIALOGS':
            return {
                ...state,
                dialogs: action.payload,
            }
        case 'APP:DATA:NULL': {
            return initialState
        }
        default:
            return state
    }
}
export default userReducer
