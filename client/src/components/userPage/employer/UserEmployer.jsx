import React, { useContext, useEffect } from 'react';
import '../../../css/main.css'
import '../../../css/advertisementsList.css'
import '../../../css/userPage.css'
import { Tab, Tabs } from 'react-bootstrap';
import EmployerAdvertisementControl from './EmployerAdvertisementControl';
import EmployerResponses from './EmployerResponses';
import EmployerResponders from './EmployerResponders';
import { Context } from '../../../index'
import { getUserSummaryResponse } from '../../../http/summaryResponseAPI';

const UserEmployer = () => {
    const { summary } = useContext(Context)
    const { user } = useContext(Context)

    useEffect(() => {
        if (user.isAuth && user._user.role === 'EMPLOYER')
            getUserSummaryResponse(user._user.id).then(data => summary.setUserSummaries(data))
    }, [])

    return (
        <Tabs defaultActiveKey="advertisementControl" className='tab'>
            <Tab eventKey="advertisementControl" title="Управление вакансиями">
                <EmployerAdvertisementControl />
            </Tab>
            <Tab eventKey="userResponses" title="Ваши отклики">
                <EmployerResponses />
            </Tab>
            <Tab eventKey="userResponders" title="Откликнувшиеся на вас">
                <EmployerResponders userRole={user.user.role} />
            </Tab>
        </Tabs>
    );
};

export default UserEmployer;