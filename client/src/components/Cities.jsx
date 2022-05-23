import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios'
import { Form, ListGroup } from 'react-bootstrap';

const Cities = ({ data, setUserCity, setBlur }) => {
    const [cities, setCities] = useState([])//Стейт всех городов
    const [searchQuery, setSearchQuery] = useState(data)//Стейт поля поиска
    const [isEntered, setIsEntered] = useState(false)//Стейт поля всплывающего окна


    const checkSearchQuery = (val) => {
        setSearchQuery(val)
        setIsEntered(true)
        if (val === '') {
            setIsEntered(true)
            setUserCity('')
        }
    }

    //Фильтрация городов
    const searchedCties = useMemo(() => {//Отфильтрованные города
        return cities.filter(city => city.city.toLowerCase().includes(searchQuery.split(', ')[0].toLowerCase()))
    }, [searchQuery, cities])

    //Сохранение города
    const saveChanges = (val) => {
        if (val.length > 0 && searchedCties.find(city => city.city === val.split(', ')[0])) {
            setUserCity(val)
        }
    }

    //Изменение строки поиска при клике по пункту выпадающего меню
    function searchitemHandler(e) {
        setSearchQuery(e.target.textContent.split(', ')[0]);
        saveChanges(e.target.textContent.split(', ')[0])
        setIsEntered(false)
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

    return (
        <div className='cityBlock'>
            <Form.Control
                placeholder="Введите город, в котором расположен ваш офис"
                className='cities-query'
                value={searchQuery}
                onChange={e => checkSearchQuery(e.target.value)}
                onBlur={() => setBlur(true)}
            />
            <ListGroup className="citiesList">
                {(searchQuery && searchQuery.length > 2 && isEntered)
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
        </div>
    );
};

export default Cities;