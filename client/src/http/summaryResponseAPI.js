import { $authHost } from './index';

export const createSummaryResponse = async (userId, summaryId) => {
    const { data } = await $authHost.post('api/summaryResponse/', { userId, summaryId })
    return data
}

export const getUserSummaryResponse = async (userId) => {
    const { data } = await $authHost.post('api/summaryResponse/userResponses', { userId })
    return data
}

export const deleteSummaryResponse = async (userId, summaryId) => {
    const { data } = await $authHost.post('api/summaryResponse/deleteUserResponse', { userId, summaryId })
    return data
}

export const getOneSummaryResponse = async (userId, summaryId) => {
    const { data } = await $authHost.post('api/summaryResponse/getone', { userId, summaryId })
    return data
}

export const getUserRespondersSummary = async (id) => {
    const { data } = await $authHost.get('api/summaryResponse/userRespondersSummary/' + id)
    return data
}

export const getUserResponders = async (id) => {
    const { data } = await $authHost.get('api/summaryResponse/userResponders/' + id)
    return data
}