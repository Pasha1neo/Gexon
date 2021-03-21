export const sendMessage = (data) => {
    return {
        type: 'SENDMESSAGE',
        data,
    }
}

export const disconnect = () => ({type: 'SOCKETOFF'})
export const selectChat = (id, name, valid) => ({
    type: 'SELECTCHAT',
    payload: {id, name, valid},
})
