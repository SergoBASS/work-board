import { $authHost } from './index';

export const createAdvertisementResponse = async (userId, advertismentId) => {
    const { data } = await $authHost.post('api/advertisementResponse/', { userId, advertismentId })
    return data
}

export const getUserAdvertisementResponse = async (userId) => {
    const { data } = await $authHost.post('api/advertisementResponse/userResponses', { userId })
    return data
}

export const deleteAdvertisementResponse = async (userId, advertismentId) => {
    const { data } = await $authHost.post('api/advertisementResponse/deleteUserResponse', { userId, advertismentId })
    return data
}

export const getOneAdvertisementResponse = async (userId, advertismentId) => {
    const { data } = await $authHost.post('api/advertisementResponse/getone', { userId, advertismentId })
    return data
}

export const getUserRespondersSummary = async (id) => {
    const { data } = await $authHost.get('api/advertisementResponse/userRespondersAdvertisements/' + id)
    return data
}

export const getUserResponders = async (id) => {
    const { data } = await $authHost.get('api/advertisementResponse/userResponders/' + id)
    return data
}