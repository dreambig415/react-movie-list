import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Card, Button, Spinner, Container } from 'react-bootstrap';
import Heading from '../../components/Heading';
import api from '../../util/api';

function MovieDetail ({match}) {
    const [movie, setMovie] = useState(null);
    
    const fetchMovie = async () => {
        const { id } = match.params;
        const data = await api.movie.read(id);
        setMovie(data);
    }

    useEffect(() => {
        fetchMovie(); // eslint-disable-next-line
    }, []);

    return (
        <Container>
            <Heading>Movie Detail Page</Heading>
            {
                movie ? (
                    <Card style={{ width: '18rem', margin: 'auto' }}>
                        <Card.Img variant="top" src={movie.Poster} alt="No Image!" />
                        <Card.Body>
                            <Card.Title>Title: {movie.Title}</Card.Title>
                            <Card.Subtitle>Year: {movie.Year}</Card.Subtitle>
                            <Card.Text>Type: {movie.Type}</Card.Text>
                            <Card.Text>Released: {movie.Released}</Card.Text>
                            <Card.Text>Genre: {movie.Genre}</Card.Text>
                            <Card.Text>Rating:</Card.Text>
                            {
                                movie.Ratings && movie.Ratings.map((rating) => (
                                    <div key={rating.Source}>
                                        <Card.Text>Source: {rating.Source}</Card.Text>
                                        <Card.Text> Value: {rating.Value}</Card.Text>
                                    </div>
                                ))
                            }
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="outline-info" block as={Link} to='/movie'>Go Back</Button>
                        </Card.Footer>
                    </Card>
                ) :  ( <Spinner animation="border" /> )
            }
        </Container>
    )
}

export default withRouter(MovieDetail);