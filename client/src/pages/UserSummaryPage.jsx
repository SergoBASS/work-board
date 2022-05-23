import React, { useContext, useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { Context } from '../index'
import UserSummaryCreate from '../components/userPage/UserSummaryCreate';
import UserSummaryUpdateDelete from '../components/userPage/UserSummaryUpdateDelete';
import '../css/main.css'
import '../css/userSummaryPage.css'
import { checkUserSummary } from '../http/userAPI';
import { ADVERTISMENTS_AND_SUMMARIES_ROUTE } from '../utils/const';

const UserSummaryPage = () => {
    const { id } = useParams()
    const { user } = useContext(Context)
    const [userSummary, setUserSummary] = useState({})
    const [loading, setLoading] = useState(true)
    const history = useHistory();

    useEffect( () => {
        async function fetchData() {
            checkUserSummary(id).then(data => setUserSummary(data)).finally(() => {
                if (id !== String(user.user.id))
                    history.push(ADVERTISMENTS_AND_SUMMARIES_ROUTE)
                setLoading(false)
            })
        }
        fetchData();
        return () => {};
    }, [id])

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
        <Container className="summaryAdvertisements-user-page-content">
            {
                userSummary != null
                    ?
                    <UserSummaryUpdateDelete id={id} userId={user.user.id} loading={loading} userSummary={userSummary} />
                    :
                    <UserSummaryCreate />
            }
        </Container>
    );
};

export default UserSummaryPage;