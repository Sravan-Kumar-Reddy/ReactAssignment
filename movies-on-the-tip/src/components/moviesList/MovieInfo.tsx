import React, { MouseEvent, useState } from "react";
import IMovie from "../../models/IMovie";
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import './css/MovieInfo.css';
import { addMovieToFavorites } from "../services/movieService";
import { ToastContainer, Toast } from "react-bootstrap";
import { AxiosError } from "axios";

type Props = {
    movie: IMovie,
    category: string
}

const MovieInfo = ({ movie, category }: Props) => {
    const [response, setResponse] = useState<'initial' | 'success' | 'error'>('initial');
    const [toastMessage, setToastMessage] = useState<string>();
    const [show, setShow] = useState<boolean>(false);
    const {
        id,
        title,
        posterurl } = movie;

    const addToFavorites = (event: React.MouseEvent<HTMLDivElement>) => {

        const addEvent = async () => {

            const movieItem = {
                ...movie,
                title: title + '@' + category,
                category: category
            };

            try {

                const data = await addMovieToFavorites(movieItem, category);
                setResponse('success');
                setToastMessage(`Movie added to favourites successfully`);
                setShow(true);
            } catch (error) {
                setResponse('error');
                setToastMessage("Movie already in favourites");
                setShow(true);
            }
        }
        addEvent();
    }

    return (
        <>
            <div
                className="card"
            // onClick={}
            >
                <aside>

                    <Link to={`/movie/${category}/${title}`} >
                        <img
                            className="card-img"
                            src={posterurl}
                            style={{ height: '365px' }}
                        />
                    </Link>
                </aside>
                <div className="card-body">
                    <div className="card-text">
                        <p className="strongText">{title}</p>
                        <div className="favoritesDiv smallText" onClick={addToFavorites}>
                            Add to Favourites &nbsp;
                            <FontAwesomeIcon
                                icon={faHeart}
                                className="heartIcon"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {
                response !== 'initial' && (
                    <ToastContainer className="p-3" position="top-end">
                        <Toast
                            bg={response === 'success' ? 'success' : 'danger'}
                            show={show}
                            autohide
                            delay={5000}
                            onClose={() => setShow(false)}
                        >
                            <Toast.Header closeButton={false}>
                                {response === 'success' ? 'Success' : 'Error'}
                            </Toast.Header>
                            <Toast.Body>
                                {toastMessage}
                            </Toast.Body>
                        </Toast>
                    </ToastContainer>
                )
            }
        </>

    )

}

export default MovieInfo;