import _ from 'lodash'
let initialState = {
    connect: true,
    usersData: null,
    dialogsData: null,
    wid: 'chat',
    user: null,
}
const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USERS:DATA:GET':
            return {
                ...state,
                usersData: action.payload,
            }
        case 'USER:CONNECT':
            return {
                ...state,
                usersData: [...state.usersData, action.payload],
            }
        case 'USER:SET:CONNECT':
            return {
                ...state,
                usersData: action.payload,
            }
        case 'MESSAGE:GET:DATA':
            return {
                ...state,
                dialogsData: action.payload,
            }
        case 'DIALOG:SELECT:END':
            return {
                ...state,
                wid: action.payload,
            }
        case 'DIALOG:CREATE':
            return {
                ...state,
                dialogsData: [...state.dialogsData, action.payload],
            }
        case 'MESSAGE:GET': {
            return {
                ...state,
                dialogsData: action.payload,
            }
        }
        case 'CHAT:CONNECT':
            return {
                ...state,
                connect: true,
            }
        case 'CHAT:DISCONNECT':
            return {
                ...state,
                connect: false,
            }
        case 'USER:SET:THIS': {
            return {
                ...state,
                user: action.payload,
            }
        }
        default:
            return state
    }
}
export default chatReducer
