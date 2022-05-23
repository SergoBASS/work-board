import React, { useState } from 'react';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getUserRespondersSummary } from '../../../http/summaryResponseAPI';
import SummaryList from '../../../components/SummaryList';
import { observer } from 'mobx-react-lite';


const EmployerResponses = observer(() => {
    const { id } = useParams()
    const [userResponsesPage, setUserResponsesPage] = useState([])

    useEffect(() => {
        getUserRespondersSummary(id).then(data => setUserResponsesPage(data))
    }, [id])

    return (
        <Card className='summaryAdvertisements-page-main border-top-0'>
            <h1>Ваши отклики</h1>
            {Array.isArray(userResponsesPage) ? <SummaryList summary={userResponsesPage} /> : <h1>{userResponsesPage.message}</h1>}
        </Card>
    );
});

export default EmployerResponses;