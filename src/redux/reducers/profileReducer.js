let initialState = {
    userId: null,
    login: null,
    nickname: null,
    avatar: null,
    posts: [],
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PROFILE:DATA:SET':
            return {
                ...state,
                ...action.payload,
            }
        case 'PROFILE:ADD:POST':
            return {
                ...state,
                posts: [...state.posts, action.payload],
            }
        case 'PROFILE:DATA:NULL': {
            return initialState
        }
        default:
            return state
    }
}
export default profileReducer
