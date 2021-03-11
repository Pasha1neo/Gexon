let initialState = {
    messageData: [],
    connect: true,
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
        case 'CONNECTIONTRUE':
            return {
                ...state,
                connect: true,
            }
        case 'CONNECTIONFALSE':
            return {
                ...state,
                connect: false,
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
export const disconnect = () => ({type: 'DISCONNECT'})
export const connectChat = () => ({type: 'CHATON'})
