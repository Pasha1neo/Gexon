import * as axios from 'axios'
const instance = axios.create({
    baseURL: `https://project-adaptive-server.herokuapp.com/api/`,
})
export const SignAPI = {
    async signup(login, email, password) {
        return await instance.post('auth/signup', {login, email, password})
    },
    async singin(login, password, rememberMe) {
        const response = await instance.post('auth/signin', {login, password, rememberMe})
        return response.data
    },
    async auth(token) {
        const response = await instance.get('auth', {
            headers: {Authorization: `Bearer ${token}`},
        })
        return response.data
    },
}
