import React, { useContext, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import '../../css/main.css'
import '../../css/userSummaryPage.css'
import useInput from '../../hooks/useInput';
import { createSummary } from '../../http/summaryAPI';
import { Context } from '../../index'
import { ADVERTISMENTS_AND_SUMMARIES_ROUTE } from '../../utils/const';
import Cities from '../Cities';
import TextEditor from '../TextEditor';

const CreateSummary = () => {
    const { user } = useContext(Context)
    const history = useHistory()
    const userSummaryName = useInput('', { isEmpty: true, maxLenght: 52 })
    const userSummaryDescription = useInput('', { isEmpty: true })
    const userCost = useInput(0, { isEmpty: true })
    const userName = useInput('', { isEmpty: true })
    const userSurname = useInput('', { isEmpty: true })
    const userContacts = useInput('', { isEmpty: true })
    const userCity = useInput('', { isEmpty: true })
    const userBirthday = useInput('', { isEmpty: true })
    const userEducation = useInput('', { isEmpty: true })
    const userEmploymentType = useInput('', { isEmpty: true })
    const [userExperience, setUserExperience] = useState(false)
    const [userAvatar, setUserAvatar] = useState(null)

    const employmentTypes = ['Полная занятость', 'Частичная занятость', 'Проектная работа/разовое задание', 'Волонтерство', 'Стажировка']
    const educationTypes = ['Высшее образование', 'Среднее специальное образование', 'Неполное высшее образование', 'Среднее образование', 'Учащийся школы', 'Кандидат наук', 'Доктор наук']


    const selectFile = e => {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            if (file && file.type.match('image.*'))
                setUserAvatar(file)
        };
        if (file && file.type.match('image.*'))
            reader.readAsDataURL(file)
        else {
            alert("Загрузите изображение")
            setUserAvatar(null)
        }
    }

    const addSummary = () => {
        try {
            const formData = new FormData()
            formData.append('city', userCity.value)
            formData.append('name', userName.value)
            formData.append('surname', userSurname.value)
            formData.append('birstday', userBirthday.value)
            formData.append('contacts', userContacts.value)
            if (userExperience === true) {
                formData.append('work_experience', `${1}`)
            } else {
                formData.append('work_experience', `${0}`)
            }
            formData.append('employment_type', userEmploymentType.value)
            formData.append('education', userEducation.value)
            formData.append('title', userSummaryName.value)
            formData.append('description', userSummaryDescription.value)
            formData.append('cost', `${userCost.value}`)
            formData.append('avatar', userAvatar)
            formData.append('userId', user._user.id)
            history.push(ADVERTISMENTS_AND_SUMMARIES_ROUTE)
            createSummary(formData)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Card className="summaryAdvertisements-user-page-main">
            <h1>Ваше резюме</h1>
            <div className='summaryBlock'>
                <Form.Control
                    type='file'
                    className='summaryAdvertisements-user-page-input'
                    onChange={selectFile}
                />
            </div>
            <div className='summaryBlock'>
                <Form.Text className='summaryAdvertisements-user-upperText'>Заголовок резюме</Form.Text>
                <Form.Control
                    placeholder="Введите заголовок"
                    className='summaryAdvertisements-user-page-input'
                    value={userSummaryName.value}
                    onChange={e => userSummaryName.onChange(e)}
                    onBlur={e => userSummaryName.onBlur(e)}
                />
                {(userSummaryName.isDirty && userSummaryName.maxLenghtError) && <div className='error'>Значение не должно быть больше 52 символов</div>}
                {(userSummaryName.isDirty && userSummaryName.isEmpty) && <div className='error'>Поле не должно быть пустым</div>}
                <Form.Text>Описание резюме</Form.Text>
                <TextEditor data={userSummaryDescription.value} setHTML={userSummaryDescription.setValueDirectly} onBlur={userSummaryDescription.onBlur} />
                {(userSummaryDescription.isDirty && userSummaryDescription.isEmpty) && <div className='error'>Поле не должно быть пустым</div>}
            </div>
            <h2>Информация о пользователе</h2>
            <div className='summaryBlock'>
                <Form>
                    <Form.Text className='summaryAdvertisements-user-upperText'>Имя</Form.Text>
                    <Form.Control
                        placeholder="Введите свое имя"
                        className='summaryAdvertisements-user-page-input'
                        value={userName.value}
                        onChange={e => userName.onChange(e)}
                        onBlur={e => userName.onBlur(e)}
                    />
                    {(userName.isDirty && userName.isEmpty) && <div className='error'>Поле не должно быть пустым</div>}
                    <Form.Text className='summaryAdvertisements-user-upperText'>Фамилия</Form.Text>
                    <Form.Control
                        placeholder="Введите свою фамилию"
                        className='summaryAdvertisements-user-page-input'
                        value={userSurname.value}
                        onChange={e => userSurname.onChange(e)}
                        onBlur={e => userSurname.onBlur(e)}
                    />
                    {(userSurname.isDirty && userSurname.isEmpty) && <div className='error'>Поле не должно быть пустым</div>}
                    <Form.Text className='summaryAdvertisements-user-upperText'>Дата рождения</Form.Text>
                    <Form.Control
                        type="date"
                        name='date_of_birth'
                        className='summaryAdvertisements-user-page-input'
                        value={userBirthday.value}
                        onChange={e => userBirthday.onChange(e)}
                        onBlur={e => userBirthday.onBlur(e)}
                    />
                    {(userBirthday.isDirty && userBirthday.isEmpty) && <div className='error'>Поле не должно быть пустым</div>}
                    <Form.Text className='summaryAdvertisements-user-upperText'>Город проживания</Form.Text>
                    <Cities data={userCity.value} setUserCity={userCity.setValueDirectly} setBlur={userCity.onBlur} />
                    {(userCity.isDirty && userCity.isEmpty) && <div className='error'>Выберите город</div>}
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
            <h2>Основная информация о вакансии</h2>
            <div className='summaryBlock'>
                <Form >
                    <Form.Text className='summaryAdvertisements-user-upperText'>Желаемая заработная плата</Form.Text>
                    <Form.Control
                        className='summaryAdvertisements-user-page-input'
                        type="number"
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
                                    onChange={e => userEmploymentType.onChange(e)}
                                    onBlur={e => userEmploymentType.onBlur(e)}
                                />
                            )
                        }
                    </div>
                    <Form.Text className='summaryAdvertisements-user-upperText'>Образование</Form.Text>
                    <div>
                        {
                            educationTypes.map((education) =>
                                <Form.Check
                                    key={education}
                                    label={education}
                                    className='summaryAdvertisements-user-page-radio'
                                    name="educationType"
                                    type="radio"
                                    value={education}
                                    onChange={e => userEducation.onChange(e)}
                                    onBlur={e => userEducation.onBlur(e)}
                                />
                            )
                        }
                    </div>

                    <Form.Text className='summaryAdvertisements-user-upperText'>Опыт работы</Form.Text>
                    <div className='summaryCheckboxBlock'>
                        <Form.Check
                            label='Есть опыт работы'
                            className='summaryAdvertisements-user-page-check'
                            checked={userExperience}
                            onChange={() => setUserExperience(!userExperience)}
                        />
                    </div>
                </Form>
            </div>
            <div className='summaryBlock'>
                <Button
                    className="bsType2Style"
                    disabled={!userSummaryName.inputValid || !userSummaryDescription.inputValid || !userCost.inputValid || !userContacts.inputValid
                        || !userCity.inputValid || !userName.inputValid || !userSurname.inputValid || !userBirthday.inputValid
                        || !userEmploymentType.inputValid || !userEducation.inputValid}
                    onClick={() => addSummary()}
                >
                    Сохранить и опубликовать
                </Button>
            </div>
        </Card>
    );
};

export default CreateSummary;