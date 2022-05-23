import { $host, $authHost } from './index';


export const createSummary = async (summary) => {
    const { data } = await $authHost.post('api/summary/', summary)
    return data
}

export const updateSummary = async (id, summary) => {
    const { data } = await $authHost.put('api/summary/' + id, summary)
    return data
}

export const deleteSummary = async (id) => {
    const { data } = await $authHost.delete('api/summary/' + id)
    return data
}

export const fetchSummary = async (title, city, page, limit) => {
    const { data } = await $host.get('api/summary/', { params: { title, city, page, limit } })
    return data
}

export const fetchFilteredSummary = async (title, city, page, limit, employment_type, workExperience, education) => {
    const { data } = await $host.get('api/summary/filter', { params: { title, city, page, limit, employment_type, workExperience, education } })
    return data
}

export const fetchOneSummary = async (id) => {
    const { data } = await $host.get('api/summary/' + id)
    return data
}

export const fetchUserSummary = async (id) => {
    const { data } = await $host.get('api/summary/userSummary/' + id)
    return data
}
