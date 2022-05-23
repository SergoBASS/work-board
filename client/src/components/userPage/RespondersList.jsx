import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { USER_RESPONDER_ADVERTISEMENT_LIST, USER_RESPONDER_SUMMARY_PAGE } from '../../utils/const';

const RespondersList = ({ userResponders, workerRole }) => {
    const history = useHistory()
    return (
        <Container className="list-container">
            {userResponders.map(responders =>
                <Card className='list-item' key={responders.id}>

                    {
                        workerRole === "EMPLOYER"
                            && (
                                <div className='responder-header'>
                                    <NavLink className="responder-title" to={USER_RESPONDER_SUMMARY_PAGE + '/' + responders.id}><h1>{responders.email}</h1></NavLink>
                                    <div className='ms-auto'>
                                        <Button className="bsType2Style" onClick={() => history.push(USER_RESPONDER_SUMMARY_PAGE + '/' + responders.id)}>Просмотр резюме</Button>
                                    </div>
                                </div>
                            )
                    }
                    {
                         workerRole === "WORKER"
                         &&(
                                <div className='responder-header'>
                                    <NavLink className="responder-title" to={USER_RESPONDER_ADVERTISEMENT_LIST + '/' + responders.id}><h1>{responders.email}</h1></NavLink>
                                    <div className='ms-auto'>
                                        <Button className="bsType2Style" onClick={() => history.push(USER_RESPONDER_ADVERTISEMENT_LIST + '/' + responders.id)}>Просмотр вакансий</Button>
                                    </div>
                                </div>
                            )

                    }
                </Card>
            )}
        </Container >
    );
};

export default RespondersList;