import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Form, Button, Spinner } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom';
import Cities from '../components/Cities';
import TextEditor from '../components/TextEditor';
import '../css/main.css'
import '../css/userAdvertisementPage.css'
import { Context } from '../index'
import useInput from '../hooks/useInput';
import { deleteAdvertisement, fetchOneAdvertisement, fetchUserOneAdvertisement, updateAdvertisement } from '../http/advertisementAPI';
import { ADVERTISMENTS_AND_SUMMARIES_ROUTE, USER_ROUTE } from '../utils/const';

const UserAdvertisementPage = () => {
    const { id } = useParams()
    const { user } = useContext(Context)
    const history = useHistory();
    const userCity = useInput('', { isEmpty: true })
    const userCompanyName = useInput('', { isEmpty: true })
    const userAddres = useInput('', { isEmpty: true })
    const userContacts = useInput('', { isEmpty: true })
    const userCost = useInput(0, { isEmpty: true })
    const [userEmploymentType, setUserEmploymentType] = useState('')
    const [userSchedule, setUserSchedule] = useState('')
    const userTitle = useInput('', { isEmpty: true, maxLenght: 52 })
    const userDescription = useInput('', { isEmpty: true })
    const employmentTypes = ['Полная занятость', 'Частичная занятость', 'Проектная работа/разовое задание', 'Волонтерство', 'Стажировка']
    const scheduleTypes = ['Полный день', 'Сменный график', 'Гибкий график', 'Удаленная работа', 'Вахтовый метод']

    const [loading, setLoading] = useState(true)

    const radioEmploymentClick = (employmentType) => setUserEmploymentType(employmentType)
    const radioScheduleClick = (schedule) => setUserSchedule(schedule)


    useEffect(() => {
        fetchUserOneAdvertisement(id, user.user.id).then(data => {
            if (!data.message) {
                fetchOneAdvertisement(id).then(data => {
                    if (data) {
                        userCity.loadData(data.city)
                        userCompanyName.loadData(data.company_name)
                        userAddres.loadData(data.addres)
                        userContacts.loadData(data.contacts)
                        userCost.loadData(data.cost)
                        userTitle.loadData(data.title)
                        setUserSchedule(data.schedule)
                        setUserEmploymentType(data.employment_type)
                        userDescription.loadData(data.description)
                        setLoading(false)
                    }
                    else
                        history.push(ADVERTISMENTS_AND_SUMMARIES_ROUTE)
                })
            }
            else {
                history.push(ADVERTISMENTS_AND_SUMMARIES_ROUTE)
            }
        })
    }, [])

    const updateUserAdvertisement = async () => {
        try {
            const data = await updateAdvertisement(
                id,
                userCity.value,
                userCompanyName.value,
                userAddres.value,
                userContacts.value,
                userCost.value,
                userTitle.value,
                userDescription.value,
                userEmploymentType,
                userSchedule
            )
            alert(data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUserAdvertisement = () => {
        try {
            deleteAdvertisement(id)
            history.push(USER_ROUTE)
        } catch (error) {
            console.log(error)
        }
    }

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
        <Container className="summaryAdvertisements-user-page-content">
            <Card className="summaryAdvertisements-user-page-main">
                <h1>Ваша вакансия</h1>
                <h2>Контактные данные</h2>
                <div className='advBlock'>
                    <Form>
                        <Form.Text className='summaryAdvertisements-user-upperText'>Название компании</Form.Text>
                        <Form.Control
                            placeholder="Введите название компании"
                            className='summaryAdvertisements-user-page-input'
                            name='companyName'
                            value={userCompanyName.value}
                            onChange={e => userCompanyName.onChange(e)}
                            onBlur={e => userCompanyName.onBlur(e)}
                        />
                        {(userCompanyName.isDirty && userCompanyName.isEmpty) && <div className='error'>Поле не должно быть пустым</div>}
                        <Form.Text className='summaryAdvertisements-user-upperText'>Город</Form.Text>
                        {
                            !loading && <Cities data={userCity.value} setUserCity={userCity.setValueDirectly} setBlur={userCity.onBlur} />
                        }
                        {(userCity.isDirty && userCity.isEmpty) && <div className='error'>Выберите город</div>}
                        <Form.Text className='summaryAdvertisements-user-upperText'>Адрес</Form.Text>
                        <Form.Control
                            placeholder="Введите адрес, в котором расположен ваш офис"
                            className='summaryAdvertisements-user-page-input'
                            name='addres'
                            value={userAddres.value}
                            onChange={e => userAddres.onChange(e)}
                            onBlur={e => userAddres.onBlur(e)}
                        />
                        {(userAddres.isDirty && userAddres.isEmpty) && <div className='error'>Поле не должно быть пустым</div>}
                        <Form.Text className='summaryAdvertisements-user-upperText'>Контактные данные</Form.Text>
                        <Form.Control
                            placeholder="Введите контактные данные"
                            className='summaryAdvertisements-user-page-input'
                            name='contacts'
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
                            name='cost'
                            value={userCost.value}
                            onChange={e => userCost.onChange(e)}
                            onBlur={e => userCost.onBlur(e)}
                        />
                        {(userCost.isDirty && userCost.isEmpty) && <div className='error'>Поле не должно быть пустым</div>}
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
                                        checked={employment === userEmploymentType}
                                        onChange={e => radioEmploymentClick(e.target.value)}
                                    />
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
                                        checked={schedule === userSchedule}
                                        onChange={e => radioScheduleClick(e.target.value)}
                                    />
                                )
                            }
                        </div>
                        <Form.Text className='summaryAdvertisements-user-upperText'>Заголовок вакансии</Form.Text>
                        <Form.Control
                            placeholder="Введите заголовок ванасии"
                            className='summaryAdvertisements-user-page-input'
                            name='title'
                            value={userTitle.value}
                            onChange={e => userTitle.onChange(e)}
                            onBlur={e => userTitle.onBlur(e)}
                        />
                        {(userTitle.isDirty && userTitle.maxLenghtError) && <div className='error'>Значение не должно быть больше 52 символов</div>}
                        {(userTitle.isDirty && userTitle.isEmpty) && <div className='error'>Поле не должно быть пустым</div>}
                        <Form.Text className='summaryAdvertisements-user-upperText'>Описание вакансии</Form.Text>
                        {
                            !loading && <TextEditor data={userDescription.value} setHTML={userDescription.setValueDirectly} onBlur={userDescription.onBlur} />
                        }
                        {(userDescription.isDirty && userDescription.isEmpty) && <div className='error'>Поле не должно быть пустым</div>}
                    </Form>
                    <div className='ms-auto'>
                        <Button
                            disabled={!userCity.inputValid || !userCompanyName.inputValid || !userAddres.inputValid || !userContacts.inputValid || !userCost.inputValid || !userTitle.inputValid || !userDescription.inputValid}
                            className='me-1'
                            variant="success"
                            onClick={updateUserAdvertisement}
                        >Сохранить
                        </Button>
                        <Button
                            variant="danger"
                            onClick={deleteUserAdvertisement}>
                            Удалить
                        </Button>
                    </div>
                </div>
            </Card>
        </Container >
    );
};

export default UserAdvertisementPage;