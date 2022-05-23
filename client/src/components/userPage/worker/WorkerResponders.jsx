import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getUserResponders } from '../../../http/advertisementResponseAPI';
import RespondersList from '../RespondersList';


const WorkerResponders = ({ userRole }) => {
    const { id } = useParams()
    const [userResponders, setUserResponders] = useState([])

    useEffect(() => {
        getUserResponders(id).then(data => setUserResponders(data))
    }, [id])
    
    return (
        <Card className='summaryAdvertisements-page-main border-top-0'>
            <h1>Откликнувшиеся на вас</h1>
            {Array.isArray(userResponders) ? <RespondersList userResponders={userResponders} workerRole={userRole} /> : <h1>{userResponders.message}</h1>}
        </Card>
    );
};

export default WorkerResponders;