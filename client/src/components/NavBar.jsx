import React, { useContext, useState } from 'react';
import { Context } from '../index'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { ADVERTISMENTS_AND_SUMMARIES_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, USER_SUMMARY_ROUTE, USER_ROUTE } from '../utils/const';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'
import '../css/navbar.css'
import '../css/main.css'
import CitiesModal from './modals/CitiesModal';

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const { city } = useContext(Context)
    const history = useHistory()
    const [citiesVisible, setCitiesVisible] = useState(false)

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem("token");
    }

    return (
        <Navbar className='navBar'>
            <Container fluid>
                <NavLink className="brandName d-inline" to={ADVERTISMENTS_AND_SUMMARIES_ROUTE}><strong>WorkBoard</strong></NavLink>
                <Nav className="d-inline" >
                    {
                        city.city === "ALL_CITIES"
                            ?
                            <Nav.Link className="cityLinkStyle" onClick={() => setCitiesVisible(true)} value={city}>{"Все города"}</Nav.Link>
                            :
                            <Nav.Link className="cityLinkStyle" onClick={() => setCitiesVisible(true)} value={city}>{city.city}</Nav.Link>
                    }

                </Nav>
                <Nav className="navUserSummary" >
                    {
                        user.isAuth
                            ?
                            (
                                user._user.role === "WORKER"
                                    ?
                                    <NavLink className="summary" to={USER_SUMMARY_ROUTE + '/' + user.user.id}>Ваше резюме</NavLink>
                                    :
                                    null
                            )
                            :
                            <NavLink className="summary" to={LOGIN_ROUTE}>Ваше резюме</NavLink>
                    }
                </Nav>
                <div className="navProfileManagement">
                    {
                        user.isAuth
                            ?
                            <Nav className="navButtons">
                                <Button variant="dark bsType1Style" onClick={() => history.push(USER_ROUTE + '/' + user.user.id)}>Ваша страница</Button>
                                <Button variant="dark bsType1Style" className="ms-2" onClick={() => logOut()}>Выйти</Button>
                            </Nav>
                            :
                            <Nav className="navButtons">
                                <Button variant="dark bsType1Style" onClick={() => history.push(LOGIN_ROUTE)} className="ms-2">Авторизация</Button>
                                <Button variant="dark bsType1Style" onClick={() => history.push(REGISTRATION_ROUTE)} className="ms-2" >Регистрация</Button>
                            </Nav>
                    }
                </div>
                <CitiesModal show={citiesVisible} onHide={() => setCitiesVisible(false)} />
            </Container>
        </Navbar>
    );
});

export default NavBar;