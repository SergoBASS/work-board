import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import '../../css/citiesModal.css'
import { Context } from '../../index'
import axios from 'axios'


const CitiesModal = ({ show, onHide }) => {
    const { city } = useContext(Context)
    const [cities, setCities] = useState([])//Стейт всех городов
    const [searchQuery, setSearchQuery] = useState('')//Стейт поля поиска

    //Фильтрация городов
    const searchedCties = useMemo(() => {//Отфильтрованные города
        return cities.filter(city => city.city.toLowerCase().includes(searchQuery.split(', ')[0].toLowerCase()))
    }, [searchQuery, cities])

    //Сохранение города
    const saveChanges = () => {
        if (searchQuery.length > 0 && searchedCties.find(city => city.city === searchQuery.split(', ')[0] && city.region === searchQuery.split(', ')[1])) {
            city.setCity(searchQuery.split(', ')[0])
            city.setRegion(searchQuery.split(', ')[1])
            onHide(true)
        } else if (searchQuery.length === 0) {
            clearCity()
        }
    }

    //Изменение строки поиска при клике по пункту выпадающего меню
    function searchitemHandler(e) {
        setSearchQuery(e.target.textContent);
        saveChanges()
    }

    //Подгрузка городов в стейт cities
    useEffect(() => {
        fetchCities()
    }, [])

    //Загрузка городов
    async function fetchCities() {
        let response = await axios.get('/russia.json')
        setCities(response.data)
    }

    //Очистка городов 
    function clearCity() {
        city.setCity('ALL_CITIES')
        city.setRegion('')
        city.setClearCity()
        onHide(true)
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='modal-title'>
                    Выберите ваш город
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Text className="text-muted">
                        Город
                    </Form.Text>
                    <Form.Control
                        placeholder="Введите город"
                        className='cities-query'
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <ListGroup className="cities-list">
                        {(searchQuery && searchQuery.length > 2)
                            ?
                            searchedCties.map((city, index) =>
                                <ListGroup.Item
                                    key={index}
                                    onClick={searchitemHandler}
                                    className='cities-list-item'
                                >
                                    {city.city}, {city.region}
                                </ListGroup.Item>
                            )
                            :
                            null
                        }
                    </ListGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark bsType2Style" onClick={saveChanges}>Сохранить</Button>
                <Button variant="dark bsType2Style" onClick={clearCity}>Все города</Button>
            </Modal.Footer>
        </Modal >
    );
};

export default CitiesModal;