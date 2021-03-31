export const selectChat = (id) => ({
    type: 'DIALOG:SELECT:START',
    id,
})
export const sendMessage = (data) => ({
    type: 'MESSAGE:SEND',
    data,
})
export const readMessage = (mid) => ({
    type: 'MESSAGE:READ',
    mid,
})
