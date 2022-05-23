import { useState, useEffect } from 'react'

const useForm = (registration, validate, setRole) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        password2: '',
        employer: Boolean(false)
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = e => {
        const { name, value, type, checked } = e.target
        if (type !== "checkbox") {
            setValues({
                ...values,
                [name]: value
            })
        } else {
            setValues({
                ...values,
                [name]: checked
            })
            if(checked === true)
                setRole("EMPLOYER")    
            else
                setRole("WORKER")
        }
    };

     const handleSubmit = e => {
        e.preventDefault()
        setErrors(validate(values))
        setIsSubmitting(true)  
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            registration();
        }
    }, [errors, isSubmitting]
    );

    return { handleChange, values, handleSubmit, errors };
}

export default useForm;