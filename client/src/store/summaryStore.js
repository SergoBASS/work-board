import { makeAutoObservable } from 'mobx'

export default class summaryStore {
    constructor() {
        this._summaries = []
        this._userSummaries = []
        this._page = 1
        this._totalCount = 0
        this._limit = 7
        makeAutoObservable(this)
    }

    setSummary(summaries) {
        this._summaries = summaries
    }

    removeUserSummary(id) {
        this._userSummaries = this._userSummaries.filter(userSmry => userSmry.summaryId !== id)
    }

    addUserSummary(newId) {
        this._userSummaries.push({ summaryId: newId })
    }

    setUserSummaries(userSummarie) {
        this._userSummaries = userSummarie
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get summary() {
        return this._summaries
    }
    get userSummary() {
        return this._userSummaries
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