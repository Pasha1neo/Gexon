import _ from 'lodash'
let initialState = {
    connect: true,
    usersData: [],
    dialogsData: [],
    wid: 'chat',
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
        case 'USER:SET:STATUS':
            return {
                ...state,
                usersData: action.usersData,
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
