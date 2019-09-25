import React, { useEffect, useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
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
    const [loading, setLoading] = useState(false);

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
            try {
                setLoading(true);
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
                setLoading(false);
            } catch (err) {
                console.warn("Error in fetching result", err.message);
            } finally {
                setLoading(false);
            }
        }
    }, [currentPage]);

    const handleSubmit = async (values) => {
        let searchString = makeSearchString(values);
        try {
            setLoading(true);
            const { Search, totalResults } = await api.movie.list({searchString, currentPage: 1});
            setCount(totalResults || 0);
            setItem('values', Search ? values : '');
            setItem('list', Search || []);
            setList(Search || []);
            setLoading(false);
        } catch (err) {
            console.warn("Error in fecthing list", err.message);
        } finally {
            setLoading(false);
        }
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
                loading ? <Spinner animation="border" variant="primary" /> :
                (
                    <>
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
                    </>
                )
            }
        </Container>
    )
}