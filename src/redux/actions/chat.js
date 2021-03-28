export const sendMessage = (data) => ({
    type: 'MESSAGE:SEND',
    data,
})

export const selectChat = (id) => ({
    type: 'DIALOG:SELECT:START',
    id,
})
