import React, { useState } from 'react';
import { Accordion, Button, Card, Form } from 'react-bootstrap';
import "../../css/filter.css"

const SummaryFilter = ({ callback }) => {
    const [filter, setFilter] = useState({
        employment: [
            { name: 'Все', value: 'all' },
            { name: 'Полная занятость', value: 'Полная занятость' },
            { name: 'Частичная занятость', value: 'Частичная занятость' },
            { name: 'Проектная работа/разовое задание', value: 'Проектная работа/разовое задание' },
            { name: 'Волонтерство', value: 'Волонтерство' },
            { name: 'Стажировка', value: 'Стажировка' },
        ],
        experience: [
            { name: 'Все', value: 'all' },
            { name: 'Есть опыт работы', value: 'Есть опыт работы' },
            { name: 'Без опыта работы', value: 'Без опыта работы' }
        ],
        education: [
            { name: 'Все', value: 'all' },
            { name: 'Высшее образование', value: 'Высшее образование' },
            { name: 'Среднее специальное образование', value: 'Среднее специальное образование' },
            { name: 'Неполное высшее образование', value: 'Неполное высшее образование' },
            { name: 'Среднее образование', value: 'Среднее образование' },
            { name: 'Учащийся школы', value: 'Учащийся школы' },
            { name: 'Кандидат наук', value: 'Кандидат наук' },
            { name: 'Доктор наук', value: 'Доктор наук' },
        ],
        employmentValue: 'all',
        experienceValue: 'all',
        educationValue: 'all',
    })

    const handleChange = e => {
        setFilter({ ...filter, [e.target.name]: e.target.value })
    }

    const handleSubmit = () =>{
        callback(filter.employmentValue, filter.experienceValue, filter.educationValue);
    }

    return (
        <Card className='filter col-3'>
            <h1>Быстрые фильтры</h1>
            <Accordion className='filter-list'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className='filter-header'>Тип занятости</Accordion.Header>
                    <Accordion.Body className='filter-body'>
                        {
                            filter.employment.map((employment) =>
                                <Form.Check
                                    key={employment.name}
                                    label={employment.name}
                                    name="employmentValue"
                                    type="radio"
                                    value={employment.value}
                                    onChange={e => handleChange(e)}
                                />
                            )
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion className='filter-list'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className='filter-header'>Опыт работы</Accordion.Header>
                    <Accordion.Body className='filter-body'>
                        {
                            filter.experience.map((experience) =>
                                <Form.Check
                                    key={experience.name}
                                    label={experience.name}
                                    name="experienceValue"
                                    type="radio"
                                    value={experience.value}
                                    onChange={e => handleChange(e)}
                                />
                            )
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion className='filter-list'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className='filter-header'>Образование</Accordion.Header>
                    <Accordion.Body className='filter-body'>
                        {
                            filter.education.map((education) =>
                                <Form.Check
                                    key={education.name}
                                    label={education.name}
                                    name="educationValue"
                                    type="radio"
                                    value={education.value}
                                    onChange={e => handleChange(e)}
                                />
                            )
                        }
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Button className="bsType2Style" type="submit" onClick={handleSubmit}>Сохранить</Button>
        </Card >
    );
};

export default SummaryFilter;