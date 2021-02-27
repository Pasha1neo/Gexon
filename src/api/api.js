import * as axios from 'axios'
const instance = axios.create({
    baseURL: `http://localhost:5000/api/`,
})
export const SignAPI = {
    async signup(email, password) {
        return await instance.post('auth/signup', {email, password})
    },
    async singin(email, password) {
        const response = await instance.post('auth/signin', {email, password})
        return response.data
    },
    async auth(token) {
        const response = await instance.get('auth', {
            headers: {Authorization: `Bearer ${token}`},
        })
        return response.data
    },
}
