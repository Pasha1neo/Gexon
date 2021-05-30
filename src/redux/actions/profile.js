export const addPost = (text) => ({
    type: 'PROFILE:CREATE:POST',
    text,
})

export const getProfile = (userId) => ({
    type: 'PROFILE:GET:USER',
    userId,
})

export const setNickname = (newNickname) => ({
    type: 'USER:CHANGE:NICKNAME',
    newNickname,
})
export const setAvatar = (newAvatar) => ({
    type: 'USER:UPLOAD:AVATAR',
    newAvatar,
})
export const deletePost = (pid) => ({
    type: 'USER:DELETE:POST',
    pid,
})
