export const selectDialog = (wid) => ({
    type: 'CHAT:PICK:DIALOG',
    wid,
})
export const sendMessage = (data) => ({
    type: 'CHAT:MESSAGE:SEND',
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
export const deleteMessage = (wid, mid) => ({
    type: 'MESSAGE:DELETE',
    wid,
    mid,
})
