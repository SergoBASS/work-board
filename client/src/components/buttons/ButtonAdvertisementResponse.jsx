import React, { useContext } from 'react';
import { Context } from '../../index'
import { createAdvertisementResponse, deleteAdvertisementResponse } from '../../http/advertisementResponseAPI';
import { useHistory } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/const';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';


const ButtonAdvertisementResponse = observer(({ adv }) => {
    const { advertisement } = useContext(Context)
    const { user } = useContext(Context)
    const history = useHistory()

    const createResponse = async (advertisementId) => {
        try {
            await createAdvertisementResponse(user._user.id, advertisementId)
            advertisement.addUserAdvertisement(advertisementId)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteResponse = async (advertisementId) => {
        try {
            await deleteAdvertisementResponse(user._user.id, advertisementId)
            advertisement.removeUserAdvertisement(advertisementId)
        } catch (e) {
            console.log(e)
        }
    }
    
    return (
        <div className='mt-1'>
            {
                user.isAuth && user._user.role === "WORKER"
                    ?
                    (
                        (advertisement.userAdvertisements.find(userAdv => userAdv.advertismentId === adv.id))
                            ?
                            <Button variant="dark bsType1Style" key={adv.id} onClick={() => deleteResponse(adv.id)}>Вы откликнулись</Button>
                            :
                            <Button variant="dark bsType2Style" key={adv.id} onClick={() => createResponse(adv.id)}>Откликнуться</Button>
                    )
                    :
                    (
                        user.isAuth && user._user.role === "EMPLOYER"
                            ?
                            <Button variant="dark bsType2Style" onClick={() => alert("Работодатели не могут откликаться на другие вакансии")}>Откликнуться</Button>
                            :
                            <Button variant="dark bsType2Style" onClick={() => history.push(LOGIN_ROUTE)}>Откликнуться</Button>
                    )
            }
        </div>
    );
});

export default ButtonAdvertisementResponse;