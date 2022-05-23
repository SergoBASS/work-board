import {makeAutoObservable} from 'mobx'

export default class cityStore{
    constructor(){
        this._city = localStorage.getItem( 'city' ) || 'ALL_CITIES'
        this._region = localStorage.getItem( 'region' ) || ''
        makeAutoObservable(this)
    }

    setCity(city){
        localStorage.setItem('city', city)
        this._city = city
    }

    setRegion(region){
        localStorage.setItem('region', region)
        this._region = region
    }

    get city(){
        return this._city
    }
    get region(){
        return this._region
    }

    setClearCity(){
        localStorage.removeItem('city')
        localStorage.removeItem('region')
    }
}