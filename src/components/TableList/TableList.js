import React from 'react';
import { Table, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function({list}) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Year</th>
                    <th>Type</th>
                    <th>Detail</th>
                </tr>
            </thead>
            <tbody>
                {
                    list.map((item, index) => (
                        <tr key={item.imdbID}>
                            <td>{index + 1}</td>
                            <td>{item.Title}</td>
                            <td><Image src={item.Poster} width='100px' height='100px' /></td>
                            <td>{item.Year}</td>
                            <td>{item.Type}</td>
                            <td>
                                <Button variant='outline-info' as={Link} to={`/movie/${item.imdbID}`}>Detail</Button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}