export const getProfile = (userId) => ({
    type: 'APP:GET:USER',
    userId,
})
export const getUsers = () => ({
    type: 'APP:GET:USERS',
})
