import React, { useContext } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import '../css/auth.css'
import '../css/main.css'
import { ADVERTISMENTS_AND_SUMMARIES_ROUTE } from '../utils/const';
import { Context } from '../index'
import { useState } from 'react';
import { login } from '../http/userAPI';

const Login = () => {
    const { user } = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const sighIn = async (event) => {
        event.preventDefault()
        try {
            let data = await login(email, password)
            user.setUser(data)
            user.setIsAuth(true)
            history.push(ADVERTISMENTS_AND_SUMMARIES_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="authContainer"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card className="authCard">
                <h2>Aвторизация</h2>
                <Form onSubmit={event => sighIn(event)}>
                    <Form.Text className="upper-text">
                        E-mail
                    </Form.Text>
                    <Form.Control
                        placeholder="Введите E-mail"
                        className="authInput"
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Text className="upper-text">
                        Пароль
                    </Form.Text>
                    <Form.Control
                        placeholder="Введите пароль"
                        className="authInput"
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className="d-grid gap-2">
                        <Button
                            variant="dark "
                            size="lg"
                            type='submit'
                            onClick={event => sighIn(event)}
                            className="subButton bsType2Style"
                        >
                            Вход
                        </Button>
                    </div>
                </Form>
            </Card>

        </Container>
    );
};

export default Login;