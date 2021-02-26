import * as axios from 'axios'
const instance = axios.create({
    baseURL: `http://localhost:3000/api`,
})
export const SignAPI = {
    singin(login, password) {
        return instance.post('/signin', {login, password})
    },
    signup(login, password) {
        return instance.post('/signup', {login, password})
    },
}
