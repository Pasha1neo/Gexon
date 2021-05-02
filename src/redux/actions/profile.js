export const addPost = (data) => ({
    type: 'POST:ADD',
    data,
})
export const deletePost = (id) => ({
    type: 'POST:DELETE',
    id,
})
export const setAvatar = (newAvatar) => ({
    type: 'USER:UPLOAD:AVATAR',
    newAvatar,
})
export const setNickname = (newNickname) => ({
    type: 'USER:CHANGE:NICKNAME',
    newNickname,
})
