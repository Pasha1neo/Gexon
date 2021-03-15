export const sendMessage = (message) => ({
    type: 'SENDMESSAGE',
    message,
})
export const disconnect = () => ({type: 'SOCKETOFF'})
export const selectChat = (id, name, valid) => ({
    type: 'SELECTCHAT',
    payload: {id, name, valid},
})

export const sendPrivateMessage = (data) => ({
    type: 'SENDPRIVATEMESSAGE',
    data,
})
