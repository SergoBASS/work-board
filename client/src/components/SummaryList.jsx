import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { observer } from 'mobx-react-lite'
import '../css/summariesList.css'
import '../css/main.css'
import { NavLink } from 'react-router-dom';
import { SUMMARY_PAGE_ROUTE} from '../utils/const';
import defaultAvatar from '../assets/img/defaultAvatar.png'
import ButtonSummaryResponse from './buttons/ButtonSummaryResponse';

const summaryList = observer(({summary}) => {
    return (
        <>
            {
                summary.map(smry =>
                    <Card className='list-item summary-list' key={smry.id}>
                        <div className='summaries-item-workName-block'>
                            <NavLink className="summaries-item-workName" to={SUMMARY_PAGE_ROUTE + '/' + smry.id}><h2>{smry.title}</h2></NavLink>
                            <h2 className='summaries-item-cost' >{smry.cost} руб./месяц</h2>
                        </div>
                        <hr />
                        <div className='summaries-description-list-block'>
                            <div>
                                <p>{smry.name + " " + smry.surname}</p>
                                <p>{smry.employment_type}</p>
                                {smry.work_experience === true
                                    ?
                                    <p>Есть опыт работы</p>
                                    :
                                    <p>Без опыта работы</p>}
                            </div>
                            <div className="summaries-item-avatar-block">
                                {
                                    smry.avatar != null
                                        ?
                                        <Image className="summaries-item-avatar" src={process.env.REACT_APP_API_URL + smry.avatar} />
                                        :
                                        <Image className="summaries-item-avatar" src={defaultAvatar} />
                                }

                            </div>
                        </div>
                        <ButtonSummaryResponse smry={smry}/>
                    </Card>
                )
            }
        </>

    );
});

export default summaryList;