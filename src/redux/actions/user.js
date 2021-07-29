export const addFriend = (fid) => ({
    type: 'USER:ADD:FRIEND',
    fid,
})
export const removeFriend = (fid) => ({
    type: 'USER:REMOVE:FRIEND',
    fid,
})
export const getFriends = () => ({
    type: 'USER:GET:FRIENDS',
})
