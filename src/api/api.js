import * as axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
const TOKEN = (() => {
    const token = localStorage.getItem('token')
    if (token) return {headers: {Authorization: `Bearer ${token}`}}
    return false
})()
const instance = axios.create({
    baseURL: `http://localhost:5000/`,
    withCredentials: true,
})
const refreshAuthLogic = async (failedRequest) => {
    const token = await instance.get('sign/refresh')
    localStorage.setItem('token', token.data.token)
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + token.data.token
    return Promise.resolve()
}
createAuthRefreshInterceptor(instance, refreshAuthLogic)

//-------------------------------------------------------

export const signApi = {
    async up(login, email, password) {
        const {data} = await instance.post('sign/up', {login, email, password})
        return data
    },

    async singin(login, password, rememberMe) {
        const {data} = await instance.post('sign/in', {login, password, rememberMe})
        return data
    },

    async auth() {
        if (!TOKEN) return false
        const {data} = await instance.get('sign', TOKEN)
        return data
    },
}

export const profileAPI = {
    async addPost(text) {
        const {data} = await instance.post('profile/create', {text}, TOKEN)
        return data
    },
    async setNickname(nickname) {
        const {data} = await instance.post('profile/nickname', {nickname}, TOKEN)
        return data
    },

    async uploadAvatar(avatar) {
        const formData = new FormData()
        formData.append('file', avatar)
        const {data} = await instance.post(`profile/avatar`, formData, TOKEN)
        return data
    },
    async getUsers() {
        const {data} = await instance.get('users')
        return data
    },
}
