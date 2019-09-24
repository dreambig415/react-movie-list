import React from 'react';
import { Col, Form, Button } from 'react-bootstrap';

export default function() {
    return (
        <>
            <h1>Movie List Page</h1>
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Search Field</Form.Label>
                        <Form.Control type="text" placeholder="Enter search movie" />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Type</Form.Label>
                        <Form.Control as="select">
                            <option>Movie</option>
                            <option>Series</option>
                            <option>Episode</option>
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group as={Col}>
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="text" placeholder="Enter Year" />
                    </Form.Group>
                    <Col>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Form.Row>
            </Form>
        </>
    )
}