import * as axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import {BaseURL} from '../../config'
const TOKEN = () => {
    const token = localStorage.getItem('token')
    if (token === 'undefined' || token === false || token === null) {
        localStorage.removeItem('token')
        return false
    }
    return {headers: {Authorization: `Bearer ${token}`}}
}
const instance = axios.create({
    baseURL: BaseURL(),
    withCredentials: true,
})
const refreshToken = async (failedRequest) => {
    if (failedRequest.response.config.url === 'sign/in') {
        return Promise.reject('Неправильные данные для входа')
    }
    const {data} = await instance.get('sign/refresh')
    if (!data) {
        localStorage.removeItem('token')
        return Promise.reject('Авторизируйтесь заново')
    }
    localStorage.setItem('token', data.token)
    failedRequest.response.config.headers['Authorization'] = 'Bearer ' + data.token
    return Promise.resolve()
}
createAuthRefreshInterceptor(instance, refreshToken)

//-------------------------------------------------------

export const signApi = {
    async up(login, email, password) {
        const {data} = await instance.post('sign/up', {login, email, password})
        return data
    },

    async in(login, password, rememberMe) {
        const {data} = await instance.post('sign/in', {login, password, rememberMe})
        return data
    },

    async auth() {
        if (!TOKEN()) return false
        const {data} = await instance.get('sign', TOKEN())
        return data
    },
    async out() {
        const {data} = await instance.get('sign/out')
        return data
    },
}

export const profileAPI = {
    async addPost(text) {
        const {data} = await instance.post('profile/create', {text}, TOKEN())
        return data
    },
    async setNickname(nickname) {
        const {data} = await instance.post('profile/nickname', {nickname}, TOKEN())
        return data
    },

    async uploadAvatar(avatar) {
        const formData = new FormData()
        formData.append('file', avatar)
        const {data} = await instance.post(`profile/avatar`, formData, TOKEN())
        return data
    },
    async getProfile(userId) {
        const {data} = await instance.get(`profile/${userId}`)
        return data
    },
}
