import React from "react";
import IMovie from "../../models/IMovie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useState } from "react";

import './css/MovieInfo.css';
import { deleteMovieToFavorites } from "../services/movieService";
import { ToastContainer, Toast } from "react-bootstrap";

type Props = {
    movie: IMovie,
    category: string
}

const FavMovieInfo = ({ movie, category }: Props) => {
    const [response, setResponse] = useState<'initial' | 'success' | 'error'>('initial');
    const [toastMessage, setToastMessage] = useState<string>();
    const [show, setShow] = useState<boolean>(false);
    const history = useHistory();
    const {
        id,
        title,
        posterurl } = movie;

    const removeFromFavourites = (event: React.MouseEvent<HTMLDivElement>) => {

        const removeEvent = async () => {
            const movieItem = {
                ...movie,
                category: category
            };

            try {
                const data = await deleteMovieToFavorites(movieItem, category);
                setResponse('success');
                setToastMessage(`Movie added to favourites successfully`);
                setShow(true);
                window.location.href = "/favourit";
            } catch (error) {
                setResponse('error');
                setToastMessage((error as Error).message);
                setShow(true);
            }

        }
        removeEvent();
        history.push("/favourit");
    }
    return (
        <>
            <div
                className="card"
            >
                <aside>
                    <Link to={`/movie/${title?.split('@')[1]}/${title?.split('@')[0]}`}>
                        <img
                            className="card-img"
                            src={posterurl}
                            style={{ height: '365px' }}
                        />
                    </Link>
                </aside>
                <div className="card-body">
                    <div className="card-text">
                        <p className="strongText">{title.split('@')[0]}</p>
                        <div className="favoritesDiv smallText" onClick={removeFromFavourites}>
                            Delete from Favourites &nbsp;
                            <FontAwesomeIcon
                                icon={faHeartCrack}
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

export default FavMovieInfo;