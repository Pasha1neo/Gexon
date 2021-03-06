let initialState = {
    messageData: [],
}
const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GETMESSAGE':
            return {
                ...state,
                messageData: [...state.messageData, action.payload],
            }
        case 'GETMESSAGESDATA':
            return {
                ...state,
                messageData: action.payload,
            }
        default:
            return state
    }
}

export default chatReducer

export const sendMessage = (message) => ({
    type: 'SENDMESSAGE',
    message,
})
export const getMessages = () => ({type: 'GETMESSAGES'})
