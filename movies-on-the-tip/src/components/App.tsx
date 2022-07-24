import React from "react";
import { Route, Switch } from "react-router";
import Container from 'react-bootstrap/Container';
import NavigationMenu from "./common/NavigationMenu";
import MovieDetails from "./movieDetails/MovieDetails";
import MoviesList from "./moviesList/MoviesList";


import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

const App = () => {
    return (
        <>
            <Container>
                <Switch>
                    <Route path="/movie/:category/:title" component={MovieDetails} exact />
                    <Route path="/:category" component={MoviesList} />
                    <Route path="/" component={MoviesList} />
                </Switch>
            </Container>
        </>
    );
};

export default App;