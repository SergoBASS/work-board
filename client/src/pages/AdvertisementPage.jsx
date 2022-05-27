import React, { useContext, useEffect } from 'react';
import { Card, Container, Form, Spinner } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
import '../css/advertisementPage.css'
import '../css/main.css'
import { fetchOneAdvertisement } from '../http/advertisementAPI';
import { useState } from 'react';
import { Context } from '../index'
import { getUserAdvertisementResponse } from '../http/advertisementResponseAPI';
import { observer } from 'mobx-react-lite';
import ButtonAdvertisementResponse from '../components/buttons/ButtonAdvertisementResponse';
import { ADVERTISMENTS_AND_SUMMARIES_ROUTE } from '../utils/const';

const AdvertisementPage = observer(() => {
    const [advertisementPage, setAdvertisementPage] = useState({})
    const history = useHistory();
    const { id } = useParams()
    const { advertisement } = useContext(Context)
    const { user } = useContext(Context)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOneAdvertisement(id).then(data => {
            if (data){
                setAdvertisementPage(data)
                setLoading(false)
            }
            else
                history.push(ADVERTISMENTS_AND_SUMMARIES_ROUTE)
        })

        if (user.isAuth && user._user.role === 'WORKER')
            getUserAdvertisementResponse(user._user.id).then(data => advertisement.setUserAdvertisement(data))
    }, [])
    
    if (loading) {
        return (
            <div className='loading'>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        )
    }

    return (
        <Container className="summaryAdvertisements-page-content">
            <Card className="summaryAdvertisements-page-main">
                <div className='summaryAdvertisements-page-header'>
                    <div className='advertisements-page-header-block'>
                        <div className='advertisements-page-item-title-cost-block'>
                            <h3 className='advertisements-page-item-title'>{advertisementPage.title}</h3>
                            <h3 className='advertisements-page-item-cost'>{advertisementPage.cost} руб./месяц</h3>
                        </div>
                        <p>{advertisementPage.company_name},
                            {" " + advertisementPage.city + ", " + advertisementPage.addres}
                        </p>
                        <Form.Text>Тип занятости</Form.Text>
                        <p>{advertisementPage.employment_type}</p>
                        <Form.Text>График работы</Form.Text>
                        <p>{advertisementPage.schedule}</p>
                        <Form.Text>Описание</Form.Text><br />
                        <div className='advertisements-page-item-description'>
                            <span dangerouslySetInnerHTML={{ __html: advertisementPage.description }} />
                        </div>
                    </div>
                </div>
                <div className='advertisements-page-item-cost-contacts'>
                    <hr />
                    <p>{advertisementPage.contacts}</p>
                    <hr />
                </div>
                <div>
                    <ButtonAdvertisementResponse adv={advertisementPage} />
                </div>
            </Card>
        </Container>
    );
});

export default AdvertisementPage;