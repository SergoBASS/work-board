import { makeAutoObservable } from 'mobx'

export default class advertisementStore {
    constructor() {
        this._advertisements = []
        this._userAdvertisements = []
        this._page = 1
        this._totalCount = 0
        this._limit = 7
        makeAutoObservable(this)
    }
    setAdvertisement(advertisement) {
        this._advertisements = advertisement
    }
    setUserAdvertisement(userAdvertisement) {
        this._userAdvertisements = userAdvertisement
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    removeUserAdvertisement(id) {
        this._userAdvertisements = this._userAdvertisements.filter(userAdv => userAdv.advertismentId !== id)
    }

    addUserAdvertisement(newId) {
        this._userAdvertisements.push({ advertismentId: newId })
    }

    get advertisements() {
        return this._advertisements
    }
    get userAdvertisements() {
        return this._userAdvertisements
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}