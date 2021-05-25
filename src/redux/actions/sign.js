export const signUp = (login, email, password, password_2) => ({
    type: 'SIGN:UP',
    login,
    email,
    password,
    password_2,
})
export const signIn = (login, password, rememberMe) => ({
    type: 'SIGN:IN',
    login,
    password,
    rememberMe,
})
export const signOut = () => ({type: 'SIGN:OUT'})
