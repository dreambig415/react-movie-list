import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import api from '../../util/api';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import { makeSearchString } from '../../util/helpers';
import { getItem, setItem } from '../../util/localStorage';

export default function() {
    const [list, setList] = useState([]);
    useEffect(() => {
        let savedList = getItem('list');
        console.log('savedList', savedList);
        if (savedList) {
            setList(savedList);
        }
    }, [])
    const handleSubmit = async (values) => {
        let searchString = makeSearchString(values);
        const { Search, totalResults } = await api.movie.list(searchString);
        console.log("totolResult", totalResults);
        setItem('values', values);
        setItem('list', Search);
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