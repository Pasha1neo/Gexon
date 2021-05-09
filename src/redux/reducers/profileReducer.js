let initialState = {
    posts: null,
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PROFILE:SET:POSTS':
            return {
                ...state,
                posts: action.payload,
            }
        case 'PROFILE:ADD:POST':
            return {
                ...state,
                posts: [...state.posts, action.payload],
            }
        default:
            return state
    }
}
export default profileReducer
