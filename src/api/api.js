import * as axios from 'axios'

const TOKEN = {
    headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
}

const instance = axios.create({
    baseURL: `http://192.168.0.100:5000/api/`,
})

export const SignAPI = {
    async signup(login, email, password) {
        return await instance.post('auth/signup', {login, email, password})
    },

    async singin(login, password, rememberMe) {
        const response = await instance.post('auth/signin', {login, password, rememberMe})
        return response.data
    },

    async auth() {
        const response = await instance.get('auth', TOKEN)
        return response.data
    },
}
export const profileAPI = {
    async setNickname(nickname) {
        const response = await instance.post('profile/nickname', {nickname}, TOKEN)
        return response.data
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
}
