import * as axios from 'axios'
const instance = axios.create({
    baseURL: `http://192.168.0.103:5000/api/`,
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
export const PostAPI = {
    async addPost(data) {
        return await instance.post('post/add', {...data})
    },
    async getPosts(payload) {
        return await instance.post('post', {id: payload})
    },
}
export const FileAPI = {
    async uploadAvatar(avatar, token) {
        const formData = new FormData()
        formData.append('file', avatar)
        return await instance.post(`file/avatar`, formData, {
            headers: {Authorization: `Bearer ${token}`},
        })
    },
}
