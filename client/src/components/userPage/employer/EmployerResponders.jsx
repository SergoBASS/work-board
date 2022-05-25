import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserResponders } from '../../../http/summaryResponseAPI';
import '../../../css/main.css'
import '../../../css/userPage.css'
import RespondersList from '../RespondersList';
import { Card } from 'react-bootstrap';

const EmployerResponders = ({ userRole }) => {
    const { id } = useParams()
    const [userResponders, setUserResponders] = useState([])

    useEffect(() => {
        getUserResponders(id).then(data => setUserResponders(data))
    }, [id])
    
    return (
        <Card className='user-page-main'>
            <h1>Откликнувшиеся на вас</h1>
            {Array.isArray(userResponders) ? <RespondersList userResponders={userResponders} workerRole={userRole} /> : <h1>{userResponders.message}</h1>}
        </Card>
    );
};

export default EmployerResponders;