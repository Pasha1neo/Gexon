import * as axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
const TOKEN = (() => {
    const token = localStorage.getItem('token')
    if (token) return {headers: {Authorization: `Bearer ${token}`}}
    return false
})()
const instance = axios.create({
    baseURL: `http://localhost:5000/api/`,
    withCredentials: true,
})
const refreshAuthLogic = async (failedRequest) => {
    const token = await instance.get('sign/refresh')
    localStorage.setItem('token', token.data.token)
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + token.data.token
    return Promise.resolve()
}
createAuthRefreshInterceptor(instance, refreshAuthLogic)

export const SignAPI = {
    async signup(login, email, password) {
        return await instance.post('sign/signup', {login, email, password})
    },

    async singin(login, password, rememberMe) {
        const response = await instance.post('sign/signin', {login, password, rememberMe})
        return response.data
    },

    async auth() {
        if (TOKEN) {
            const response = await instance.get('sign', TOKEN)
            return response.data
        }
        return false
    },
}
export const profileAPI = {
    async setNickname(nickname) {
        const response = await instance.post('profile/nickname', {nickname}, TOKEN)
        return response.datap
    },
    async uploadAvatar(avatar) {
        const formData = new FormData()
        formData.append('file', avatar)
        const response = await instance.post(`profile/avatar`, formData, TOKEN)
        return response.data
    },

    async addPost(data) {
        const response = await instance.post('profile/create', {...data}, TOKEN)
        return response.data
    },

    async getPosts(payload) {
        const response = await instance.post('profile', {id: payload}, TOKEN)
        return response.data
    },
    async getUsers(payload) {
        const response = await instance.get('users')
        return response.data
    },
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
