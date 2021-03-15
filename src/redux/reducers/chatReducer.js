let initialState = {
    usersData: [],
    messageData: [],
    connect: true,
    chatWith: {id: 'message', name: 'Общий чат', valid: true},
}
//почистить action слова что бы небыло хлама!!!
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
        case 'SELECTCHAT':
            return {
                ...state,
                chatWith: action.payload,
            }
        case 'GETUSERSDATA':
            return {
                ...state,
                usersData: action.payload,
            }
        case 'USERCONNECTED':
            return {
                ...state,
                usersData: [...state.usersData, action.payload],
            }
        case 'SETUSERSTATUSDISCONNECTED':
            return {
                ...state,
                usersData: action.usersData,
            }
        default:
            return state
    }
}
export default chatReducer
