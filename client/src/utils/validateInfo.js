export default function validateInfo(values) {
    let errors = {}
    //email
    if (!values.email) {
        errors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Некорректный e-mail';
    }
    //passwords
    if (!values.password) {
        errors.password = 'Введите пароль'
    } else if (values.password.length < 6) {
        errors.password = 'Пароль меньше 6 символов'
    }

    if (!values.password2) {
        errors.password2 = 'Введите пароль'
    } else if (values.password2 !== values.password) {
        errors.password2 = 'Пароли не совпадают'
    }

    return errors;
}