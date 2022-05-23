import { $host, $authHost } from './index';


export const createAdvertisement = async (city, company_name, addres, contacts, cost, title, description, employment_type, schedule, userId) => {
    const { data } = await $authHost.post('api/advertisement/', { city, company_name, addres, contacts, cost, title, description, employment_type, schedule, userId })
    return data
}

export const updateAdvertisement = async (id, city, company_name, addres, contacts, cost, title, description, employment_type, schedule) => {
    const { data } = await $authHost.put('api/advertisement/' + id, { city, company_name, addres, contacts, cost, title, description, employment_type, schedule })
    return data
}

export const deleteAdvertisement = async (id) => {
    const { data } = await $authHost.delete('api/advertisement/' + id)
    return data
}

export const fetchUserAdvertisement = async (id) => {
    const { data } = await $authHost.get('api/advertisement/userAdvertisements/' + id)
    return data
}

export const fetchUserOneAdvertisement = async (id, userId) => {
    const { data } = await $authHost.post('api/advertisement/userOneAdvertisement', { id, userId })
    return data
}

export const fetchAdvertisement = async (title, city, page, limit) => {
    const { data } = await $host.get('api/advertisement', { params: { title, city, page, limit } })
    return data
}

export const fetchFilteredAdvertisement = async (title, city, page, limit, employment_type, schedule,) => {
    const { data } = await $host.get('api/advertisement/filter', { params: { title, city, page, limit, employment_type, schedule} })
    return data
}

export const fetchOneAdvertisement = async (id) => {
    const { data } = await $host.get('api/advertisement/' + id)
    return data
}

