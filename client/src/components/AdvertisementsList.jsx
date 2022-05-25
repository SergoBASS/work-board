import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite'
import '../css/advertisementsList.css'
import '../css/main.css'
import { NavLink} from 'react-router-dom';
import { ADVERTISMENT_PAGE_ROUTE } from '../utils/const';
import ButtonAdvertisementResponse from './buttons/ButtonAdvertisementResponse';

const AdvertisementsList = observer(({advertisement}) => {
    return (
        <>
            {
                advertisement.map(adv =>
                    <Card className='list-item' key={adv.id}>
                        <div className='advertisements-item-title-cost-block'>
                            <NavLink className="advertisements-item-title" to={ADVERTISMENT_PAGE_ROUTE + '/' + adv.id}><h2>{adv.title}</h2></NavLink>
                            <h2 className='advertisements-item-cost' >{adv.cost} руб./месяц</h2>
                        </div>
                        <hr />
                        <div className='advertisements-item-main'>
                            <p>{adv.company_name}, {adv.city}, {adv.addres}</p>
                            <Form.Text>Тип занятости</Form.Text>
                            <p>{adv.employment_type}</p>
                            <Form.Text>График работы</Form.Text>
                            <p>{adv.schedule}</p>
                        </div>
                        <ButtonAdvertisementResponse adv={adv}/>
                    </Card>
                )
            }
        </>
    );
});

export default AdvertisementsList;