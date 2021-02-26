import * as axios from 'axios'
const instance = axios.create({
    baseURL: `http://localhost:5000/api/`,
})
export const SignAPI = {
    signup(email, password) {
        console.log(email, password)
        return instance.post('auth/signup', {email, password})
    },
    singin(email, password) {
        return instance.post('auth/signin', {email, password})
    },
    auth(email, password) {
        return instance.get('auth', {})
    },
}
