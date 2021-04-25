export const addPost = (data) => ({
    type: 'POST:ADD',
    data,
})
export const deletePost = (id) => ({
    type: 'POST:DELETE',
    id,
})
export const setAvatar = (avatar) => ({
    type: 'USER:UPLOAD:AVATAR',
    avatar,
})
