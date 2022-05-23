import React, { useContext, useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { getUserAdvertisementResponse } from '../../../http/advertisementResponseAPI';
import { Context } from '../../../index'
import WorkerResponders from './WorkerResponders';
import WorkerResponses from './WorkerResponses';

const UserWorker = () => {
    const { advertisement } = useContext(Context)
    const { user } = useContext(Context)

    useEffect(() => {
        if (user.isAuth && user._user.role === 'WORKER')
            getUserAdvertisementResponse(user._user.id).then(data => advertisement.setUserAdvertisement(data))
    }, [])

    return (
        <Tabs defaultActiveKey="userResponses">
            <Tab eventKey="userResponses" title="Ваши отклики">
                <WorkerResponses />
            </Tab>
            <Tab eventKey="userResponders" title="Откликнувшиеся на вас">
                <WorkerResponders userRole={user.user.role} />
            </Tab>
        </Tabs>
    );
};

export default UserWorker;