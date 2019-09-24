import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import api from '../../util/api';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';

function makeSearchString(values) {
    let searchString = '';
    for (let [key, val] of Object.entries(values)) {
        console.log(key, val);
        if (!val) {
            continue;
        } 
        switch (key) {
            case 'title':
                searchString += `&s=${val}`;
                break;
            case 'year':
                searchString += `&y=${val}`;
                break;
            case 'type':
                searchString += `&type=${val}`;
                break;
            default:
                break;
        }
    }
    return searchString;
}

export default function() {
    const [list, setList] = useState([]);

    const handleSubmit = async (values) => {
        let searchString = makeSearchString(values);
        const { Search, totalResult } = await api.movie.list(searchString);
        setList(Search);
    }
    return (
        <Container>
            <SearchForm
                onSubmit={handleSubmit}
            />
            <TableList
                list={list}
            />
        </Container>
    )
}