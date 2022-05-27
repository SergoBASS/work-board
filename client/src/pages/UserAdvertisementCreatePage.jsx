import React, { useContext } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom';
import Cities from '../components/Cities';
import TextEditor from '../components/TextEditor';
import '../css/main.css'
import '../css/userAdvertisementPage.css'
import useInput from '../hooks/useInput';
import { createAdvertisement } from '../http/advertisementAPI';
import { Context } from '../index'
import { ADVERTISMENTS_AND_SUMMARIES_ROUTE } from '../utils/const';

const UserAdvertisementCreatePage = () => {
    const { user } = useContext(Context)
    const { id } = useParams()
    const history = useHistory()
    const userCity = useInput('', { isEmpty: true })
    const userCompanyName = useInput('', { isEmpty: true })
    const userAddres = useInput('', { isEmpty: true })
    const userContacts = useInput('', { isEmpty: true })
    const userCost = useInput(0, { isEmpty: true, isNotInteger: false })
    const userSchedule = useInput('', { isEmpty: true })
    const userEmploymentType = useInput('', { isEmpty: true })
    const userTitle = useInput('', { isEmpty: true, maxLenght: 52 })
    const userDescription = useInput('', { isEmpty: true })
    const employmentTypes = ['Полная занятость', 'Частичная занятость', 'Проектная работа/разовое задание', 'Волонтерство', 'Стажировка']
    const scheduleTypes = ['Полный день', 'Сменный график', 'Гибкий график', 'Удаленная работа', 'Вахтовый метод']


    const addAdvertisement = async () => {
        try {
            await createAdvertisement(userCity.value, userCompanyName.value, userAddres.value, userContacts.value, userCost.value, userTitle.value, userDescription.value, userEmploymentType.value, userSchedule.value, user._user.id)
            history.push(ADVERTISMENTS_AND_SUMMARIES_ROUTE)
        } catch (error) {
            console.log(error)
        }
    }


    if (id === String(user.user.id))
        return (
            <Container className="summaryAdvertisements-user-page-content">
                <Card className="summaryAdvertisements-user-page-main">
                    <h1>Ваша вакансия</h1>
                    <h2>Контактные данные</h2>
                    <div className='advBlock'>
                        <Form>
                            <Form.Text className='summaryAdvertisements-user-upperText'>Название компании</Form.Text>
                            <Form.Control
                                placeholder="Введите название своей компании"
                                className='summaryAdvertisements-user-page-input'
                                value={userCompanyName.value}
                                onChange={e => userCompanyName.onChange(e)}
                                onBlur={e => userCompanyName.onBlur(e)}
                            />
                            {(userCompanyName.isDirty && userCompanyName.isEmpty) && <div className='error'>Поле не должно быть пустым</div>}
                            <Form.Text className='summaryAdvertisements-user-upperText'>Город</Form.Text>
                            <Cities data={userCity.value} setUserCity={userCity.setValueDirectly} setBlur={userCity.onBlur} />
                            {(userCity.isDirty && userCity.isEmpty) && <div className='error'>Выберите город</div>}
                            <Form.Text className='summaryAdvertisements-user-upperText'>Адрес</Form.Text>
                            <Form.Control
                                placeholder="Введите адрес, в котором расположен ваш офис"
                                className='summaryAdvertisements-user-page-input'
                                value={userAddres.value}
                                onChange={e => userAddres.onChange(e)}
                                onBlur={e => userAddres.onBlur(e)}
                            />
                            {(userAddres.isDirty && userAddres.isEmpty) && <div className='error'>Поле не должно быть пустым</div>}
                            <Form.Text className='summaryAdvertisements-user-upperText'>Контактные данные</Form.Text>
                            <Form.Control
                                placeholder="Введите контактные данные"
                                className='summaryAdvertisements-user-page-input'
                                value={userContacts.value}
                                onChange={e => userContacts.onChange(e)}
                                onBlur={e => userContacts.onBlur(e)}
                            />
                            {(userContacts.isDirty && userContacts.isEmpty) && <div className='error'>Поле не должно быть пустым</div>}
                        </Form>
                    </div>
                    <h2>Информация о вакансии</h2>
                    <div className='advBlock'>
                        <Form >
                            <Form.Text className='summaryAdvertisements-user-upperText'>Заработная плата претендента</Form.Text>
                            <Form.Control
                                className='summaryAdvertisements-user-page-input'
                                type="number"
                                value={userCost.value}
                                onChange={e => userCost.setNumValue(e.target.value)}
                                onBlur={e => userCost.onBlur(e)}
                            />
                            {(userCost.isDirty && userCost.isEmpty) && <div className='error'>Поле не должно быть пустым</div>}
                            {(userCost.isDirty && userCost.isNotInteger) && <div className='error'>Поле должно быть целочисленным</div>}
                            <Form.Text className='summaryAdvertisements-user-upperText'>Тип занятости</Form.Text>
                            <div>
                                {
                                    employmentTypes.map((employment) =>
                                        <Form.Check
                                            key={employment}
                                            label={employment}
                                            className='summaryAdvertisements-user-page-radio'
                                            name="employmentType"
                                            type="radio"
                                            value={employment}
                                            onChange={e => userEmploymentType.onChange(e)}
                                            onBlur={e => userEmploymentType.onBlur(e)}
                                        />,
                                        (userEmploymentType.isDirty && userEmploymentType.isEmpty) && <div className='error'>Поле не должно быть пустым</div>
                                    )
                                }
                            </div>
                            <Form.Text className='summaryAdvertisements-user-upperText'>График работы</Form.Text>
                            <div>
                                {
                                    scheduleTypes.map((schedule) =>
                                        <Form.Check
                                            key={schedule}
                                            label={schedule}
                                            className='summaryAdvertisements-user-page-radio'
                                            name="schedule"
                                            type="radio"
                                            value={schedule}
                                            onChange={e => userSchedule.onChange(e)}
                                            onBlur={e => userSchedule.onBlur(e)}
                                        />
                                    )
                                }
                            </div>
                            <Form.Text className='summaryAdvertisements-user-upperText'>Заголовок вакансии</Form.Text>
                            <Form.Control
                                placeholder="введите заголовок вакансии"
                                className='summaryAdvertisements-user-page-input'
                                value={userTitle.value}
                                onChange={e => userTitle.onChange(e)}
                                onBlur={e => userTitle.onBlur(e)}
                            />
                            {(userTitle.isDirty && userTitle.isEmpty) && <div className='error'>Поле не должно быть пустым</div>}
                            {(userTitle.isDirty && userTitle.maxLenghtError) && <div className='error'>Значение не должно быть больше 52 символов</div>}
                            <Form.Text className='summaryAdvertisements-user-upperText'>Описание вакансии</Form.Text>
                            <TextEditor data={userDescription.value} setHTML={userDescription.setValueDirectly} onBlur={userDescription.onBlur} />
                            {(userDescription.isDirty && userDescription.isEmpty) && <div className='error'>Поле не должно быть пустым</div>}

                        </Form>
                    </div>
                    <div className='advBlock'>
                        <Button
                            className="bsType2Style"
                            disabled={!userCity.inputValid || !userCompanyName.inputValid || !userAddres.inputValid || !userContacts.inputValid || !userCost.inputValid || !userTitle.inputValid || !userDescription.inputValid || !userSchedule.inputValid || !userEmploymentType.inputValid}
                            onClick={() => addAdvertisement()}
                        >
                            Сохранить и опубликовать
                        </Button>
                    </div>
                </Card>
            </Container >
        );
    else {
        history.push(ADVERTISMENTS_AND_SUMMARIES_ROUTE)
        return (<></>)
    }

};

export default UserAdvertisementCreatePage;