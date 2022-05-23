import React, { useState } from 'react';
import '../../css/main.css'
import '../../css/userSummaryPage.css'
import { Button, Card, Form, Image } from 'react-bootstrap';
import { deleteSummary, updateSummary } from '../../http/summaryAPI';
import defaultAvatar from '../../assets/img/defaultAvatar.png'
import { useHistory } from 'react-router-dom';
import { ADVERTISMENTS_AND_SUMMARIES_ROUTE } from '../../utils/const';
import useInput from '../../hooks/useInput';
import TextEditor from '../TextEditor';
import Cities from '../Cities';

const SummaryUpdateDelete = ({ loading, userSummary }) => {
    const userSummaryName = useInput(userSummary.title, { isEmpty: true, maxLenght: 52 })
    const userSummaryDescription = useInput(userSummary.description, { isEmpty: true })
    const userCost = useInput(userSummary.cost, { isEmpty: true, isNotInteger: false})
    const userName = useInput(userSummary.name, { isEmpty: true })
    const userSurname = useInput(userSummary.surname, { isEmpty: true })
    const userContacts = useInput(userSummary.contacts, { isEmpty: true })
    const userCity = useInput(userSummary.city, { isEmpty: true })
    const userBirthday = useInput(userSummary.birstday, { isEmpty: true })
    const userEducation = useInput(userSummary.education, { isEmpty: true })
    const userEmploymentType = useInput(userSummary.employment_type, { isEmpty: true })
    const [userExperience, setUserExperience] = useState(userSummary.work_experience, { isEmpty: true })
    const [userAvatar, setUserAvatar] = useState({ file: undefined, imagePreviewUrl: userSummary.avatar })
    const history = useHistory()

    const employmentTypes = ['Полная занятость', 'Частичная занятость', 'Проектная работа/разовое задание', 'Волонтерство', 'Стажировка']
    const educationTypes = ['Высшее образование', 'Среднее специальное образование', 'Неполное высшее образование', 'Среднее образование', 'Учащийся школы', 'Кандидат наук', 'Доктор наук']

    const uploadImageToClient = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            if (file && file.type.match('image.*'))
                setUserAvatar({
                    file: file,
                    imagePreviewUrl: reader.result
                });

        };
        if (file && file.type.match('image.*'))
            reader.readAsDataURL(file)
        else {
            alert("Загрузите изображение")
            setUserAvatar({
                file: undefined,
                imagePreviewUrl: userSummary.avatar
            });
        }
    }

    const updateUserSummary = async () => {
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
            formData.append('avatar', userAvatar.file)
            const data = await updateSummary(userSummary.id, formData)
            alert(data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUserSummary = () => {
        try {
            deleteSummary(userSummary.id)
            history.push(ADVERTISMENTS_AND_SUMMARIES_ROUTE)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Card className="summaryAdvertisements-page-main">
            <h1>Ваше резюме</h1>
            <div className='summaryAdvertisements-page-header'>
                <div className='userSummary-main-info'>
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
                    <Form.Text className='summaryAdvertisements-user-upperText'>Желаемая зароботная плата</Form.Text>
                    <Form.Control
                        className='summaryAdvertisements-user-page-input'
                        type="number"
                        value={userCost.value}
                        onChange={e => userCost.onChange(e)}
                        onBlur={e => userCost.onBlur(e)}
                    />
                    {(userCost.isDirty && userCost.isEmpty) && <div className='error'>Поле не должно быть пустым</div>}
                    {(userCost.isDirty && userCost.isNotInteger) && <div className='error'>Поле должно быть целочисленным</div>}
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
                    {
                        !loading && <Cities data={userCity.value} setUserCity={userCity.setValueDirectly} setBlur={userCity.onBlur} />
                    }
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
                    <Form.Text className='summaryAdvertisements-user-upperText'>Тип занятости</Form.Text>
                    <div className='summaryAdvertisements-user-page-input'>
                        {
                            employmentTypes.map((employment) =>
                                <Form.Check
                                    key={employment}
                                    label={employment}
                                    className='summaryAdvertisements-user-page-radio'
                                    name="employmentType"
                                    type="radio"
                                    value={employment}
                                    checked={employment === userEmploymentType.value}
                                    onChange={e => userEmploymentType.onChange(e)}
                                    onBlur={e => userEmploymentType.onBlur(e)}
                                />
                            )
                        }
                    </div>
                    <Form.Text className='summaryAdvertisements-user-upperText'>Образование</Form.Text>
                    <div className='summaryAdvertisements-user-page-input'>
                        {
                            educationTypes.map((education) =>
                                <Form.Check
                                    key={education}
                                    label={education}
                                    className='summaryAdvertisements-user-page-radio'
                                    name="educationType"
                                    type="radio"
                                    value={education}
                                    checked={education === userEducation.value}
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
                </div>
                <div className='user-summaries-page-avatar-block'>
                    {
                        userSummary.avatar === null && userAvatar.file === undefined
                            ?
                            <Image className="user-summaries-page-avatar" src={defaultAvatar} />
                            :
                            (
                                userAvatar.imagePreviewUrl === userSummary.avatar
                                    ?
                                    <Image className="user-summaries-page-avatar" src={process.env.REACT_APP_API_URL + userAvatar.imagePreviewUrl} />
                                    :
                                    <Image className="user-summaries-page-avatar" src={userAvatar.imagePreviewUrl} />
                            )

                    }
                    <Form.Control
                        type='file'
                        className='summaryAdvertisements-user-page-input'
                        onChange={uploadImageToClient}
                    />
                </div>
            </div>
            <div>
                <hr />
                <Form.Text>Описание резюме</Form.Text>
                {
                    !loading && <TextEditor data={userSummaryDescription.value} setHTML={userSummaryDescription.setValueDirectly} onBlur={userSummaryDescription.onBlur} />
                }
                {(userSummaryDescription.isDirty && userSummaryDescription.isEmpty) && <div className='error'>Поле не должно быть пустым</div>}
                <hr />
            </div>
            <div className='ms-auto'>
                <Button
                    className='me-1'
                    variant="success"
                    disabled={!userSummaryName.inputValid || !userSummaryDescription.inputValid || !userCost.inputValid || !userContacts.inputValid
                        || !userCity.inputValid || !userName.inputValid || !userSurname.inputValid || !userBirthday.inputValid
                        || !userEmploymentType.inputValid || !userEducation.inputValid}
                    onClick={updateUserSummary}
                >
                    Сохранить
                </Button>
                <Button
                    variant="danger"
                    onClick={deleteUserSummary}
                >
                    Удалить
                </Button>
            </div>
        </Card>
    );
};

export default SummaryUpdateDelete;