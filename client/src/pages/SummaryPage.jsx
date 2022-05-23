import React, { useContext, useEffect, useState } from 'react';
import { Card, Container, Form, Image } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'
import '../css/summaryPage.css'
import '../css/main.css'
import { fetchOneSummary } from '../http/summaryAPI';
import defaultAvatar from '../assets/img/defaultAvatar.png'
import { Context } from '../index'
import { getUserSummaryResponse } from '../http/summaryResponseAPI';
import { observer } from 'mobx-react-lite';
import ButtonSummaryResponse from '../components/buttons/ButtonSummaryResponse';
import { ADVERTISMENT_PAGE_ROUTE } from '../utils/const';

const SummaryPage = observer(() => {
    const [summaryPage, setSummaryPage] = useState({})
    const { id } = useParams()
    const history = useHistory()
    const { summary } = useContext(Context)
    const { user } = useContext(Context)

    useEffect(() => {
        fetchOneSummary(id).then(data => {
            if (data)
                setSummaryPage(data)
            else
                history.push(ADVERTISMENT_PAGE_ROUTE)
        })
        if (user.isAuth && user._user.role === 'EMPLOYER')
            getUserSummaryResponse(user._user.id).then(data => summary.setUserSummaries(data))
    }, [])


    return (
        <Container className="summaryAdvertisements-page-content">
            <Card className="summaryAdvertisements-page-main">
                <div className='summaryAdvertisements-page-header'>
                    <div>
                        <h3>{summaryPage.title}</h3>
                        <Form.Text>Желаемая зарплата</Form.Text>
                        <h4>{summaryPage.cost} руб./месяц</h4>
                        <p>{summaryPage.name + " " + summaryPage.surname}</p>
                        <Form.Text>Год рождения</Form.Text>
                        <p>{String(summaryPage.birstday).split('-')[2] + '.' + String(summaryPage.birstday).split('-')[1] + '.' + String(summaryPage.birstday).split('-')[0]}</p>
                        <Form.Text>Город</Form.Text>
                        <p>{summaryPage.city}</p>
                        <Form.Text>Тип занятости</Form.Text>
                        <p>{summaryPage.employment_type}</p>
                        <Form.Text>Опыт работы</Form.Text>
                        {summaryPage.work_experience === true
                            ?
                            <p>Есть опыт работы</p>
                            :
                            <p>Без опыта работы</p>}
                        <Form.Text>Контакты</Form.Text>
                        <p>{summaryPage.contacts}</p>
                        <Form.Text>Образование</Form.Text>
                        <p>{summaryPage.education}</p>
                    </div>
                    <div className='summaries-page-avatar-block'>
                        {
                            summaryPage.avatar != null
                                ?
                                <Image className="summaries-page-avatar" src={process.env.REACT_APP_API_URL + summaryPage.avatar} />
                                :
                                <Image className="summaries-page-avatar" src={defaultAvatar} />
                        }
                    </div>
                </div>
                <div className='summaries-page-description'>
                    <hr />
                    <span dangerouslySetInnerHTML={{ __html: summaryPage.description }} />
                    <hr />
                </div>
                <ButtonSummaryResponse smry={summaryPage} />
            </Card>
        </Container>
    );
});

export default SummaryPage;