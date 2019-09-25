import React, { useEffect, useState } from 'react';
import { Col, Form, Button, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { getItem } from '../../util/localStorage';
import Heading from '../Heading';
import './style.css';

const schema = yup.object({
    title: yup.string().required(),
    type: yup.string(),
    year: yup.string(),
});

export default function({onSubmit}) {
    const [savedValues, setSavedValues] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        let values = getItem('values');
        if (values) {
            setSavedValues(values);
        }
        setLoading(false);
    }, [])
    return (
        <>
        {
            loading ? (<Spinner animation='border' variant='primary' />) : (
            <Formik
                enableReinitialize={true}
                validationSchema={schema}
                onSubmit={onSubmit}
                initialValues={{
                    title: savedValues.title || '',
                    type: savedValues.type || '',
                    year: savedValues.year || '',
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                }) => (
                    <>
                        <Heading>Movie List Page</Heading>
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
                                    <Button variant="outline-info" onClick={handleSubmit} disabled={!!errors.title} className="submit-button">
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
        </>
    )
}