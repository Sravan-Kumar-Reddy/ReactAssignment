import { match } from "assert";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { getMovieByTitle } from '../services/movieService';

import './css/MovieDetails.css';
import { Category, LoadingStatus } from "../../models/types";
import MovieDetailsNavMenu from "../common/MovieDetailsNavMenu";
import IMovie from "../../models/IMovie";

const MovieDetails = ({ match }: RouteComponentProps<{ title: string, category: string }>) => {
    const [category, setCategory] = useState<Category>('moviesInTheatres');
    const [movie, setMovie] = useState<IMovie>();
    const [status, setStatus] = useState<LoadingStatus>('LOADING');
    const [error, setError] = useState<Error | null>(null);

    useEffect(
        () => {
            const fetchMovieItems = async () => {
                try {
                    console.log(match.params)
                    const data = await getMovieByTitle(match.params.category, match.params.title);
                    setMovie(data[0]);
                    setStatus('LOADED');
                } catch (error) {
                    setError(error as Error);
                    setStatus('ERROR_LOADING');
                }
            };
            fetchMovieItems();
        },
        []
    );

    let el = (
        <Row>
            <MovieDetailsNavMenu />
            <Col xs={1} md={2} lg={3}>
                <img src={movie?.posterurl} alt="Movie Poster" />
            </Col>
            <Col xs={1} md={2} lg={9}>
                <div id="movieTitle">
                    {movie?.title} ({movie?.year})
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                Imdb Rating:
                            </th>
                            <td>
                                {movie?.imdbRating}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Content Rating
                            </th>
                            <td>
                                {movie?.contentRating}
                            </td>

                        </tr>
                        <tr>
                            <th>
                                Average Rating
                            </th>
                            <td>

                                {movie?.averageRating}
                            </td>

                        </tr>
                        <tr>
                            <th>
                                Duration
                            </th>
                            <td>

                                {movie?.duration && movie.duration || ""}
                            </td>

                        </tr>
                        <tr>
                            <th>
                                Genres
                            </th>
                            <td>

                                {movie?.genres.map((genre, idx) => (idx < movie.genres.length - 1) ? (genre + ',') : (genre))}
                            </td>

                        </tr>
                        <tr>
                            <th>
                                Actors
                            </th>
                            <td>
                                {
                                    movie?.actors.map((actor, idx) => (idx < movie.actors.length - 1) ? (actor + ",") : (actor))
                                }
                            </td>

                        </tr>
                        <tr>
                            <th>
                                Release Date
                            </th>
                            <td>

                                {movie?.releaseDate && movie.releaseDate || ""}
                            </td>

                        </tr>
                        <tr>
                            <th>
                                Story Line
                            </th>
                            <td>

                                {movie?.storyline && movie.storyline || ""}
                            </td>

                        </tr>
                    </tbody>
                </table>
            </Col>
        </Row>
    )

    return (
        el
    )
}

export default MovieDetails;