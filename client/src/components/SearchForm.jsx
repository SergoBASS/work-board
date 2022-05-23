import React from 'react';
import { useState } from 'react';
import { InputGroup, FormControl, Form, Container, Button} from 'react-bootstrap';
import '../css/main.css'
import '../css/searchForm.css'

const SearchForm = ({ setSearch }) => {
    const options = [
        {
            label: "Вакансии",
            value: "advertisement",
        },
        {
            label: "Резюме",
            value: "summary",
        }
    ];

    const [searchBy, setSearchBy] = useState({ value: 'advertisement' })
    const [sereachField, setSearchField] = useState('')

    function handleChange(event) {
        event.preventDefault();
        setSearchBy({ value: event.target.value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setSearch(sereachField, searchBy.value);
    }


    return (
        <Container className="searchContainer">
            <form onSubmit={(event) => handleSubmit(event)}>
                <InputGroup>
                    <FormControl
                        placeholder="Поиск"
                        value={sereachField}
                        onChange={e => setSearchField(e.target.value)}
                    />
                    <Button
                        className='close-button'
                        variant="outline-secondary"
                        onClick={() => setSearchField("")}
                    >
                        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px"><path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" /></svg>
                    </Button>
                    <Form.Select style={{ maxWidth: "15em" }} onChange={handleChange}>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </Form.Select>
                    <Button className="bsType2Style" type="submit" onClick={(event) => handleSubmit(event)}>Поиск</Button>
                </InputGroup>
            </form>
        </Container>
    );
};

export default SearchForm;