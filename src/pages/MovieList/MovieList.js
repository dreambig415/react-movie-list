import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import api from '../../util/api';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Pagination from '../../components/Pagination';
import { makeSearchString } from '../../util/helpers';
import { getItem, setItem } from '../../util/localStorage';

export default function() {
    const [list, setList] = useState([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let savedList = getItem('list');
        console.log('savedList', savedList);
        if (savedList) {
            setList(savedList);
        }
    }, []);

    useEffect(() => {
        let values = getItem('values');
        let searchString = makeSearchString(values);
        (async () => {
            const { Search, totalResults } = await api.movie.list({searchString, currentPage});
            setCount(totalResults);
            setItem('list', Search);
            setList(Search);
        })();
    }, [currentPage]);

    const handleSubmit = async (values) => {
        let searchString = makeSearchString(values);
        const { Search, totalResults } = await api.movie.list({searchString, currentPage});
        console.log("totalResult", totalResults);
        setCount(totalResults);
        setItem('values', values);
        setItem('list', Search);
        setList(Search);
    }
    
    const handlePageChange = async (pageNum) => {
        console.log("Current Page Number", pageNum);
        setCurrentPage(pageNum);
    }

    return (
        <Container>
            <SearchForm
                onSubmit={handleSubmit}
            />
            <TableList list={list} /> 
            <Pagination
                currentPage={currentPage} 
                totalCount={count}
                onChange={handlePageChange}
            />
        </Container>
    )
}