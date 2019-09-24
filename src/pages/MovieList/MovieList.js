import React from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import SearchForm from '../../components/SearchForm';
import TableList from '../../components/TableList';

export default function() {
    return (
        <Container>
            <SearchForm />
            <TableList />
        </Container>
    )
}