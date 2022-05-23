import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { createSummaryResponse, deleteSummaryResponse } from '../../http/summaryResponseAPI';
import { LOGIN_ROUTE } from '../../utils/const';
import { Context } from '../../index'

const ButtonSummaryResponse = observer(({ smry }) => {
    const { summary } = useContext(Context)
    const { user } = useContext(Context)
    const history = useHistory()

    const createResponse = async (summaryId) => {
        try {
            await createSummaryResponse(user._user.id, summaryId)
            summary.addUserSummary(summaryId)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteResponse = async (summaryId) => {
        try {
            await deleteSummaryResponse(user._user.id, summaryId)
            summary.removeUserSummary(summaryId)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            {
                user.isAuth && user._user.role === "EMPLOYER"
                    ?
                    (summary.userSummary.find(userSmry => userSmry.summaryId === smry.id))
                        ?
                        <Button variant="dark bsType1Style" key={smry.id} onClick={() => deleteResponse(smry.id)}>Вы откликнулись</Button>
                        :
                        <Button variant="dark bsType2Style" key={smry.id} onClick={() => createResponse(smry.id)}>Откликнуться</Button>
                    :
                    (
                        user.isAuth && user._user.role === "WORKER"
                            ?
                            <Button variant="dark bsType2Style" onClick={() => alert("Работники не могут откликаться на другие резюме")}>Откликнуться</Button>
                            :
                            <Button variant="dark bsType2Style" onClick={() => history.push(LOGIN_ROUTE)}>Откликнуться</Button>
                    )
            }
        </div>
    );
});

export default ButtonSummaryResponse;