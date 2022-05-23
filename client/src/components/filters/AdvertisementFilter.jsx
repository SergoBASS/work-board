import React, { useState } from 'react';
import { Accordion, Button, Card, Form } from 'react-bootstrap';
import "../../css/filter.css"

const AdvertisementFilter = ({ callback }) => {
    const [filter, setFilter] = useState({
        employmentTypes: [
            { name: 'Все', value: 'all' },
            { name: 'Полная занятость', value: 'Полная занятость' },
            { name: 'Частичная занятость', value: 'Частичная занятость' },
            { name: 'Проектная работа/разовое задание', value: 'Проектная работа/разовое задание' },
            { name: 'Волонтерство', value: 'Волонтерство' },
            { name: 'Стажировка', value: 'Стажировка' },
        ],
        scheduleTypes: [
            { name: 'Все', value: 'all' },
            { name: 'Полный день', value: 'Полный день' },
            { name: 'Сменный график', value: 'Сменный график' },
            { name: 'Гибкий график', value: 'Гибкий график' },
            { name: 'Удаленная работа', value: 'Удаленная работа' },
            { name: 'Вахтовый метод', value: 'Вахтовый метод' }
        ],
        employmentValue: 'all',
        scheduleValue: 'all',
    })

    const handleChange = e => {
        setFilter({ ...filter, [e.target.name]: e.target.value })
    }

    const handleSubmit = () =>{
        callback(filter.employmentValue, filter.scheduleValue);
    }

    return (
        <Card className='filter col-3'>
            <h1>Быстрые фильтры</h1>
            <Accordion className='filter-list'>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className='filter-header' >Тип занятости</Accordion.Header>
                    <Accordion.Body className='filter-body'>
                        {
                            filter.employmentTypes.map((employment) =>
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
                    <Accordion.Header className='filter-header'>График работы</Accordion.Header>
                    <Accordion.Body className='filter-body'> 
                        {
                            filter.scheduleTypes.map((schedule) =>
                                <Form.Check
                                    key={schedule.name}
                                    label={schedule.name}
                                    name="scheduleValue"
                                    type="radio"
                                    value={schedule.value}
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

export default AdvertisementFilter;