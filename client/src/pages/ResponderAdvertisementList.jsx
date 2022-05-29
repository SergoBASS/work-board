import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdvertisementsList from '../components/AdvertisementsList';
import { fetchUserAdvertisement } from '../http/advertisementAPI';
import { getUserAdvertisementResponse } from '../http/advertisementResponseAPI';
import { Container } from 'react-bootstrap';
import { Context } from '../index'
import '../css/main.css'

const ResponderAdvertisementList = () => {
    const { id } = useParams()
    const [respondersAdvertisements, setRespondersAdvertisements] = useState([])
    const { user } = useContext(Context)
    const { advertisement } = useContext(Context)

    useEffect(() => {
        if (user.isAuth && user.user.role === 'WORKER') {
            getUserAdvertisementResponse(user._user.id).then(data => advertisement.setUserAdvertisement(data))
            fetchUserAdvertisement(id).then(data => setRespondersAdvertisements(data))
        }
    }, [])

    return (
        <Container className="list-container">
            <h1 className='response-title'>Вакансии откликнувшегося пользователя</h1>
            {
                Object.keys(respondersAdvertisements).length === 0
                ?
                <h1 className='response-title'>Ничего не найдено</h1>
                :
                <AdvertisementsList advertisement={respondersAdvertisements} />
            }
        </Container>
    );
};

export default ResponderAdvertisementList;