import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';

export default function() {
    return (
        <Switch>
            <Route exact path='/' component={MovieList} />
            <Route exact path='/movie' component={MovieList} />
            <Route exact path='/movie/:id' component={MovieDetail} />
        </Switch>
    )
}