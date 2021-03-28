export const registration = (login, email, password, password_2) => ({
    type: 'SIGN:UP',
    login,
    email,
    password,
    password_2,
})
export const initApp = () => ({type: 'APP:INIT:START'})
export const login = (login, password, rememberMe) => ({
    type: 'LOGIN',
    login,
    password,
    rememberMe,
})
export const logout = () => ({type: 'LOG:OUT'})
