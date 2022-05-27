import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import AdvertisementsList from '../components/AdvertisementsList';
import SummaryList from '../components/SummaryList';
import SearchForm from '../components/SearchForm';
import { fetchAdvertisement, fetchFilteredAdvertisement } from '../http/advertisementAPI';
import { Context } from '../index'
import { fetchFilteredSummary, fetchSummary } from '../http/summaryAPI';
import { getUserAdvertisementResponse } from '../http/advertisementResponseAPI';
import { getUserSummaryResponse } from '../http/summaryResponseAPI';
import AdvertisementPages from '../components/pagination/AdvertisementPages';
import SummaryPages from '../components/pagination/SummaryPages';
import { Container } from 'react-bootstrap';
import AdvertisementFilter from '../components/filters/AdvertisementFilter';
import SummaryFilter from '../components/filters/SummaryFilter';

const AdvertisementsSummaries = observer(() => {
    const { advertisement } = useContext(Context)
    const { summary } = useContext(Context)
    const { city } = useContext(Context)
    const { user } = useContext(Context)
    const [searchBy, setSearchBy] = useState('advertisement')
    const [searchValue, setSearchValue] = useState('')
    const [advertisementFillter, setAdvertisementFillter] = useState({
        status: false,
        employmentValue: 'all',
        scheduleValue: 'all',
    })
    const [summaryFillter, setSummaryFillter] = useState({
        status: false,
        employmentValue: 'all',
        experienceValue: 'all',
        educationValue: 'all'
    })

    const setSearch = (searchField, searchType) => {
        setSearchBy(searchType)
        setSearchValue(searchField)
    }
    useEffect(() => {
        setAdvertisementFillter({ status: false, employmentValue: 'all', scheduleValue: 'all' })
        setSummaryFillter({ status: false, employmentValue: 'all', experienceValue: 'all', educationValue: 'all' })
        advertisement.setPage(1)
        summary.setPage(1)
    }, [searchBy])

    useEffect(() => {//ЗАГРУЗКА ОТКЛИКОВ ПОЛЬЗОВАТЕЛЯ
        if (user.isAuth && user._user.role === 'WORKER')
            getUserAdvertisementResponse(user._user.id).then(data => advertisement.setUserAdvertisement(data))
        else if (user.isAuth && user._user.role === 'EMPLOYER')
            getUserSummaryResponse(user._user.id).then(data => summary.setUserSummaries(data))
    }, [])

    useEffect(() => {//СМЕНА ЗНАЧЕНИЯ ПОИСКА, ГОРОДА
        if (searchBy === "advertisement") {
            fetchAdvertisement(searchValue, city.city, 1, advertisement.limit).then(data => {
                advertisement.setAdvertisement(data.rows)
                advertisement.setTotalCount(data.count)
                advertisement.setPage(1)
            })
        }
        else
            fetchSummary(searchValue, city.city, 1, advertisement.limit).then(data => {
                summary.setSummary(data.rows)
                summary.setTotalCount(data.count)
                summary.setPage(1)
            })

    }, [searchBy, searchValue, city.city])

    useEffect(() => {//СМЕНА КНОПКИ В ПАНЕЛИ ПАГИНАЦИИ ДЛЯ ВАКАНСИИ
        if (!advertisementFillter)
            fetchAdvertisement(searchValue, city.city, advertisement.page, advertisement.limit).then(data => {
                advertisement.setAdvertisement(data.rows)
                advertisement.setTotalCount(data.count)
            })
        else
            fetchFilteredAdvertisement(searchValue, city.city, advertisement.page, advertisement.limit, advertisementFillter.employmentValue, advertisementFillter.scheduleValue).then(data => {
                advertisement.setAdvertisement(data.rows)
                advertisement.setTotalCount(data.count)
            })
    }, [advertisement.page, advertisementFillter])

    useEffect(() => {//СМЕНА КНОПКИ В ПАНЕЛИ ПАГИНАЦИИ ДЛЯ РЕЗЮМЕ
        if (!summaryFillter)
            fetchSummary(searchValue, city.city, summary.page, summary.limit).then(data => {
                summary.setSummary(data.rows)
                summary.setTotalCount(data.count)
            })
        else
            fetchFilteredSummary(searchValue, city.city, summary.page, advertisement.limit, summaryFillter.employmentValue, summaryFillter.experienceValue, summaryFillter.educationValue).then(data => {
                summary.setSummary(data.rows)
                summary.setTotalCount(data.count)
            })
    }, [summary.page, summaryFillter])

    const filterAdvData = (employmentValue, scheduleValue) => {//ФИЛЬТР ВАКАНСИЙ
        advertisement.setPage(1)
        if (employmentValue !== 'all' || scheduleValue !== 'all'){
            advertisement.setPage(1)
            setAdvertisementFillter({ status: true, employmentValue: employmentValue, scheduleValue: scheduleValue })
        }
        else{
            advertisement.setPage(1)
            setAdvertisementFillter({ status: false, employmentValue: 'all', scheduleValue: 'all' })
        }     
    }

    const filterSmryData = (employmentValue, experienceValue, educationValue) => {//ФИЛЬТР РЕЗЮМЕ
        if (employmentValue !== 'all' || experienceValue !== 'all' || educationValue !== 'all') {
            summary.setPage(1)
            setSummaryFillter({ status: false, employmentValue: employmentValue, experienceValue: experienceValue, educationValue: educationValue })
        }
        else{
            summary.setPage(1)
            setSummaryFillter({ status: false, employmentValue: 'all', experienceValue: 'all', educationValue: 'all' })
        }
           
    }

    return (
        <div>
            <SearchForm setSearch={setSearch} />
            {searchBy === "advertisement"
                ?
                (<Container className="advSmry-main">
                    <AdvertisementFilter callback={filterAdvData} />
                    <div className="advSmry-list col-md">
                        <AdvertisementsList advertisement={advertisement.advertisements} />
                        <AdvertisementPages />
                    </div>
                </Container>)
                :
                (<Container className="advSmry-main">
                    <SummaryFilter callback={filterSmryData} />
                    <div className="advSmry-list col-md">
                        <SummaryList summary={summary.summary} />
                        <SummaryPages />
                    </div>
                </Container>)
            }
        </div >
    );
});

export default AdvertisementsSummaries;