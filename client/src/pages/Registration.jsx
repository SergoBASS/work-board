import React from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import '../css/auth.css'
import { LOGIN_ROUTE } from '../utils/const';
import useForm from '../hooks/useForm';
import validate from '../utils/validateInfo'
import { registration } from '../http/userAPI';
import { useState } from 'react';

const Registration = () => {
    const [role, setRole] = useState("WORKER")

    const registrationUser = async () => {
        try {
            await registration(values.email, values.password, role)
            history.push(LOGIN_ROUTE)
        } catch (error) {
            console.log(error)
            alert(error.response.data.message)
        }
    }

    const { handleChange, values, handleSubmit, errors } = useForm( registrationUser, validate, setRole);
    const history = useHistory()
    return (
        <Container
            className="authContainer"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card className="authCard">
                <h2>Регистрация</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Text className="upper-text">
                        E-mail
                    </Form.Text>
                    <Form.Control
                        placeholder="Введите E-mail"
                        className="authInput"
                        name="email"
                        type='email'
                        value={values.email}
                        onChange={handleChange}
                    />
                    <div className="error">
                        {errors.email && <p>{errors.email}</p>}
                    </div>
                    <Form.Text className="upper-text">
                        Пароль
                    </Form.Text>
                    <Form.Control
                        placeholder="Введите пароль"
                        className="authInput"
                        name="password"
                        type='password'
                        value={values.password}
                        onChange={handleChange}
                    />
                    <div className="error">
                        {errors.password && <p >{errors.password}</p>}
                    </div>
                    <Form.Text className="upper-text">
                        Повторный ввод пароля
                    </Form.Text>
                    <Form.Control
                        placeholder="Введите пароль"
                        className="authInput"
                        name="password2"
                        type='password'
                        value={values.password2}
                        onChange={handleChange}
                    />
                    <div className="error">
                        {errors.password2 && <p >{errors.password2}</p>}
                    </div>
                    <Form.Check
                        name="employer"
                        type='checkbox'
                        className="authInput"
                        label='Зарегистрироваться как работодатель'
                        checked={values.employer}
                        onChange={handleChange}
                    />
                    <div className="d-grid gap-2">
                        <Button
                            variant="dark"
                            size="lg"
                            type='submit'
                            className="subButton bsType2Style"
                        >
                            Регистрация
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default Registration;