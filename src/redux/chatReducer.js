const ADDMESSAGE = 'ADDMESSAGE'
const UPLOADMESSAGEDATA = 'UPLOADMESSAGEDATA'
let initialState = {
    messageData: [],
}
const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDMESSAGE:
            return {
                ...state,
                messageData: [...state.messageData, action.payload],
            }
        case UPLOADMESSAGEDATA:
            return {
                ...state,
                messageData: action.data,
            }
        default:
            return state
    }
}

export const addMessage = (message) => (dispatch) => {
    dispatch(setMessageData(message))
}
export const uploadMessages = (data) => (dispatch) => {
    dispatch(uploadMessageData(data))
}
export const setMessageData = (payload) => ({
    type: ADDMESSAGE,
    payload,
})

export const uploadMessageData = (data) => ({
    type: UPLOADMESSAGEDATA,
    data,
})

export default chatReducer
