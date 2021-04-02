export const selectChat = (id) => ({
    type: 'DIALOG:SELECT:START',
    id,
})
export const sendMessage = (data) => ({
    type: 'MESSAGE:SEND',
    data,
})
export const changeMessage = (wid, mid, message) => ({
    type: 'MESSAGE:CHANGE',
    wid,
    mid,
    message,
})
export const readMessage = (wid, mid) => ({
    type: 'MESSAGE:READ',
    wid,
    mid,
})
