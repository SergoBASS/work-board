import { useEffect, useState } from "react"

const useValidation = (value, validatons) => {
    const [isEmpty, setEmpty] = useState(true)
    const [minLenghtError, setMinLenghtError] = useState(false)
    const [maxLenghtError, setMaxLenghtError] = useState(false)
    const [inputValid, setInputValid] = useState(false)
    useEffect(() => {
        for (const validation in validatons) {
            switch (validation) {
                case 'minLenght':
                    value.length < validatons[validation] ? setMinLenghtError(true) : setMinLenghtError(false)
                    break;
                case 'maxLenght':
                    value.length > validatons[validation] ? setMaxLenghtError(true) : setMaxLenghtError(false)
                    break;
                case 'isEmpty':
                    if (value) {
                        if (value === "<p></p>" || value === "<h1></h1>" || value === 
                        "<h2></h2>" || value === "<h3></h3>" || value === "<h4></h4>" || value === "<h5></h5>" || value === "<h6></h6>" || value ==="<blockquote></blockquote>")
                            setEmpty(true)
                        else
                            setEmpty(false)
                    }
                    else
                        setEmpty(true)
                    break;
                default:
                    break;    
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || minLenghtError || maxLenghtError) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, minLenghtError, maxLenghtError])

    return {
        isEmpty,
        minLenghtError,
        maxLenghtError,
        inputValid
    }
}

const useInput = (initialValue, validation) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validation)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const setValueDirectly = (val) => {
        setValue(val)
    }

    const loadData = (val) => {
        setValue(val)
    }

    const onBlur = (e) => {
        setDirty(true)
    }

    return {
        value,
        isDirty,
        onChange,
        setValueDirectly,
        loadData,
        onBlur,
        ...valid
    }
}

export default useInput;