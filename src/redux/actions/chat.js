export const sendMessage = (message) => ({
    type: 'SENDMESSAGE',
    message,
})
export const getMessages = () => ({type: 'GETMESSAGES'})
export const disconnect = () => ({type: 'DISCONNECT'})
export const connectChat = () => ({type: 'CHATON'})
