import React, { useContext, useEffect } from 'react';
import '../css/main.css'
import { Context } from '../index'
import UserWorker from '../components/userPage/worker/UserWorker';
import { Container } from 'react-bootstrap';
import UserEmployer from '../components/userPage/employer/UserEmployer';
import { useHistory, useParams } from 'react-router-dom';
import { USER_ROUTE } from '../utils/const';

const UserPage = () => {
    const { user } = useContext(Context)
    const { id } = useParams()
    const history = useHistory()

    useEffect(() => {
        if (id !== user.user.id)
            history.push(USER_ROUTE + '/' + user._user.id)
    }, [])

    return (
        <Container className="summaryAdvertisements-user-page-content">
            {user.isAuth && user.user.role === "EMPLOYER" && <UserEmployer />}
            {user.isAuth && user.user.role === "WORKER" && <UserWorker />}
        </Container>
    );
};

export default UserPage;