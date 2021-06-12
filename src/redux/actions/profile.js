export const addPost = (text, tid) => ({
    type: 'PROFILE:CREATE:POST',
    text,
    tid,
})
export const deletePost = (pid) => ({
    type: 'USER:DELETE:POST',
    pid,
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
