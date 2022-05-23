import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getUserRespondersSummary } from '../../../http/advertisementResponseAPI';
import AdvertisementsList from '../../AdvertisementsList';

const WorkerResponses = () => {
    const { id } = useParams()
    const [userResponsesPage, setUserResponsesPage] = useState([])

    useEffect(() => {
        getUserRespondersSummary(id).then(data => setUserResponsesPage(data))
    }, [id])

    return (
        <Card className='summaryAdvertisements-page-main border-top-0'>
            <h1>Ваши отклики</h1>
            {Array.isArray(userResponsesPage) ? <AdvertisementsList advertisement={userResponsesPage} /> : <h1>{userResponsesPage.message}</h1>}
        </Card>
    );
};

export default WorkerResponses;