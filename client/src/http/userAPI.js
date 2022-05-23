import { $host, $authHost } from './index';
import jwt_decode from "jwt-decode"

export const registration = async (email, password, role) => {
    const { data } = await $host.post('api/user/registration', { email, password, role })
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const { data } = await $host.post('api/user/login', { email, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const checkUserSummary = async (id) => {
    const { data } = await $authHost.get('api/user/userSummary/' + id)
    return data
}

export const checkUserAdvertisement = async (id) => {
    const { data } = await $authHost.get('api/user/userAdvertisement/' + id)
    return data
}