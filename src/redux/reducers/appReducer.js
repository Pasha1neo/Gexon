import {auth} from './authReducer'

const INITIALIZEDSUCCESS = 'INITIALIZEDSUCCESS'
const CHECKTOKEN = 'CHECKTOKEN'
let initialState = {
    initialized: false,
    isToken: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZEDSUCCESS:
            return {
                ...state,
                initialized: true,
            }
        case CHECKTOKEN:
            return {
                ...state,
                isToken: action.payload,
            }

        default:
            return state
    }
}

export const initializedSuccess = () => ({type: INITIALIZEDSUCCESS})
export const isLocalToken = (isToken) => ({type: CHECKTOKEN, payload: isToken})

export const initializeApp = () => (dispatch) => {
    dispatch(auth())
}

export default appReducer
