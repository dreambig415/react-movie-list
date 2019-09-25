import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import api from '../../util/api';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';
import Pagination from '../../components/Pagination';
import { makeSearchString } from '../../util/helpers';
import { getItem, setItem } from '../../util/localStorage';
import Heading from '../../components/Heading';

export default function() {
    const [list, setList] = useState([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        let savedList = getItem('list');
        let savedCurrentPage = getItem('currentPage');
        if (savedList) {
            setList(savedList);
        }
        if (savedCurrentPage) {
            setCurrentPage(savedCurrentPage);
        }
    }, []);

    useEffect(() => {
        let values = getItem('values');
        if (values) {
            let searchString = makeSearchString(values);
            (async () => {
                const { Search, totalResults } = await api.movie.list({searchString, currentPage});
                setCount(totalResults);
                setItem('list', Search);
                if (Search) {
                    setList(Search);
                } else {
                    setList([]);
                }
            })();
        }
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
        setItem('currentPage', pageNum);
        setCurrentPage(pageNum);
    }

    return (
        <Container>
            <SearchForm
                onSubmit={handleSubmit}
            />
            <Heading size='sm'>Search Result</Heading>
            { 
                list.length ? (
                    <>
                        <TableList list={list} /> 
                        <Pagination
                            currentPage={currentPage} 
                            totalCount={count}
                            onChange={handlePageChange}
                        />
                    </>
                ) : <Heading size='xs'>No Search Result</Heading>
            }
        </Container>
    )
}