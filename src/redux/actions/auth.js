export const registration = (login, email, password, password_2) => ({
    type: 'REGISTRATION',
    login,
    email,
    password,
    password_2,
})
export const initApp = () => ({type: 'INITAPP'})
export const login = (login, password, rememberMe) => ({
    type: 'LOGIN',
    login,
    password,
    rememberMe,
})
export const logout = () => ({type: 'LOGOUT'})
