import React, { Component, useState, KeyboardEvent, useEffect } from 'react';
import IMovie from '../../models/IMovie';
import MovieInfo from './MovieInfo';
import FavMovieInfo from './FavMovieInfo';
import movies from './../../data/json/data.json';
import { Row, Col, Form } from 'react-bootstrap';
import { RouteComponentProps, Route } from "react-router-dom";
import { Category } from '../../models/types'
import { filterMoviesBySeachString, getMoviesByCategory } from "../services/movieService";
import NavigationMenu from '../common/NavigationMenu';
import SearchBox from '../common/SearchBox'
import path from 'path';
import { match } from 'assert';
import '../moviesList/css/MovieList.css';


const MoviesList = ({ match }: RouteComponentProps<{ category: string }>) => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [movieItems, setMovieItems] = useState<IMovie[]>();
    const [error, setError] = useState<Error | null>(null);
    let category: string = "";

    useEffect(
        () => {

            // setSearchValue("");
            const fetchMovieItems = async () => {
                try {
                    let category: string;
                    if (match.params.category === undefined) {
                        category = "movies-in-theaters"
                    } else {
                        category = match.params.category;
                    }
                    const data = await getMoviesByCategory(category);
                    setMovieItems(data);
                } catch (error) {
                    setError(error as Error);
                }
            };

            fetchMovieItems();
        },
        []
    );
    useEffect(() => {
        setSearchValue("");

        const fetchMovieItems = async () => {
            try {

                if (match.params.category === undefined) {
                    category = "movies-in-theaters"
                } else {
                    category = match.params.category;
                }
                const data = await getMoviesByCategory(category);
                setMovieItems(data);
            } catch (error) {
                setError(error as Error);
            }
        };

        fetchMovieItems();
    }, [match.params.category]);

    const updateValues = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = event.target;
        setSearchValue(value);
    }

    const filterMovies = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const fetchMovieItems = async () => {
            try {
                const data = await filterMoviesBySeachString(match.params.category, searchValue);
                setMovieItems(data);
            } catch (error) {
                setError(error as Error);
            }
        };
        fetchMovieItems();
    };

    return (
        <>
            <div className='row d-flex align-items-center mt-4 mb-4' style={{ border: "1px solid #CCC" }}>
                <NavigationMenu />
                <Form className="d-flex searchBoxClass">
                    <Form.Control
                        type="text"
                        placeholder="Search Movie"
                        className="me-2"
                        id="movieSearch"
                        aria-label="Search"
                        name="searchValue"
                        value={searchValue}
                        onChange={updateValues}
                        onKeyUp={filterMovies}
                    />
                </Form>
            </div>
            <Row xs={2} md={5}>
                {movieItems && movieItems.map((movieItem, idx) => (
                    <Col key={idx} >
                        {
                            ((match.params.category !== undefined && match.params.category !== "favourit") && <MovieInfo category={match.params.category.toString()} movie={movieItem} />) ||
                            <FavMovieInfo movie={movieItem} category={match.params.category} />
                        }
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default MoviesList;