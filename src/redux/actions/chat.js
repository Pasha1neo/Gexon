export const selectDialog = (wid) => ({
    type: 'CHAT:PICK:DIALOG',
    wid,
})
export const sendMessage = (data) => ({
    type: 'CHAT:MESSAGE:SEND',
    data,
})
export const readMessage = (wid, mid) => ({
    type: 'CHAT:MESSAGE:READ',
    wid,
    mid,
})

export const changeMessage = (wid, mid, text) => ({
    type: 'CHAT:MESSAGE:CHANGE',
    wid,
    mid,
    text,
})

export const deleteMessage = (wid, mid) => ({
    type: 'CHAT:MESSAGE:DELETE',
    wid,
    mid,
})
