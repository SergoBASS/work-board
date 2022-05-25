import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Form, Spinner } from 'react-bootstrap';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { checkUserAdvertisement } from '../../../http/userAPI';
import { USER_ADVERTISEMENT_CREATE_ROUTE, USER_ADVERTISEMENT_ROUTE } from '../../../utils/const';
import '../../../css/main.css'
import '../../../css/advertisementsList.css'
import { Context } from '../../../index'

const EmployerAdvertisementControl = () => {
    const { id } = useParams()
    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [userAdvertisements, setUserAdvertisements] = useState([])
    const history = useHistory()

    useEffect(() => {
        checkUserAdvertisement(id).then(data => setUserAdvertisements(data)).finally(() => setLoading(false))
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
        <Card className='user-page-main'>
            <h1>Управление вакансиями</h1>
            <div className='ms-auto'>
                <Button className="bsType2Style" onClick={() => history.push(USER_ADVERTISEMENT_CREATE_ROUTE + '/' + user.user.id)}>Добавить</Button>
            </div>
            <hr />
            {
                userAdvertisements.map(advertisement =>
                    <Card className='list-item' key={advertisement.id}>
                        <div className='advertisements-item-title-cost-block'>
                            <NavLink className="advertisements-item-title" to={USER_ADVERTISEMENT_ROUTE + '/' + advertisement.id}><h2>{advertisement.title}</h2></NavLink>
                        </div>
                        <hr />
                        <div className='advertisements-item-main'>
                            <p>{advertisement.company_name}, {advertisement.city}, {advertisement.addres}</p>
                            <Form.Text>Тип занятости</Form.Text>
                            <p>{advertisement.employment_type}</p>
                            <Form.Text>График работы</Form.Text>
                            <p>{advertisement.schedule}</p>
                        </div>
                    </Card>
                )
            }
        </Card>
    );
};

export default EmployerAdvertisementControl;