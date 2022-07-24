import React from "react";
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

import './css/common.css';

let filterMovies = () => {
    console.log("Triggered in Nav Menu");
}
const MovieDetailsNavMenu = () => {
    return (
        <>
            <Nav
                defaultActiveKey="movies-in-theaters"
            >
                <Nav.Item>
                    <Nav.Link eventKey="movies-in-theaters" as={Link} to="/movies-in-theaters">Back To Home</Nav.Link>
                </Nav.Item>

            </Nav>
        </>
    )
}

export default MovieDetailsNavMenu;