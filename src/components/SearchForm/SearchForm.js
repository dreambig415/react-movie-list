import React from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object({
    title: yup.string().required(),
    type: yup.string(),
    year: yup.string(),
});

export default function({onSubmit}) {
    return (
        <Formik
            validationSchema={schema}
            onSubmit={onSubmit}
            initialValues={{
                title: '',
                type: '',
                year: '',
            }}
        >
            {({
                handleSubmit,
                handleChange,
                values,
                errors,
            }) => (
                <>
                    <h1>Movie List Page</h1>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Search Field</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="title"
                                    placeholder="Enter search movie"
                                    value={values.title}
                                    onChange={handleChange}
                                    isInvalid={!!errors.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.title}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Type</Form.Label>
                                <Form.Control 
                                    as="select"
                                    name="type"
                                    value={values.type}
                                    onChange={handleChange}
                                >
                                    <option value="">Choose...</option>
                                    <option value="movie">Movie</option>
                                    <option value="series">Series</option>
                                    <option value="episode">Episode</option>
                                </Form.Control>
                            </Form.Group>
                            
                            <Form.Group as={Col}>
                                <Form.Label>Year</Form.Label>
                                <Form.Control 
                                    type="text"
                                    name="year"
                                    placeholder="Enter Year"
                                    value={values.year}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Col>
                                <Button variant="primary" onClick={handleSubmit} disabled={!!errors.title}>
                                    Submit
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </>
            )}
        </Formik>
    )
}