import { useEffect, useState } from "react"

const useValidation = (value, validatons) => {
    const [isEmpty, setEmpty] = useState(true)
    const [isNotInteger, setNotInteger] = useState(false)
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
                            "<h2></h2>" || value === "<h3></h3>" || value === "<h4></h4>" || value === "<h5></h5>" || value === "<h6></h6>" || value === "<blockquote></blockquote>")
                            setEmpty(true)
                        else
                            setEmpty(false)
                    }
                    else
                        setEmpty(true)
                    break;
                case 'isNotInteger':
                    if (Number.isInteger(Number(value)))
                        setNotInteger(false)
                    else
                        setNotInteger(true)
                default:
                    break;
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || minLenghtError || maxLenghtError || isNotInteger) {
            setInputValid(false)
        } else {
            setInputValid(true)
        }
    }, [isEmpty, minLenghtError, maxLenghtError, isNotInteger])

    return {
        isEmpty,
        isNotInteger,
        minLenghtError,
        maxLenghtError,
        inputValid
    }
}

const useInput = (initialValue, validation) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validation)

    const maxNumLenght = 11

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const setNumValue = (val) =>{
        setValue(val.slice(0, maxNumLenght))
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
        setNumValue,
        setValueDirectly,
        loadData,
        onBlur,
        ...valid
    }
}

export default useInput;