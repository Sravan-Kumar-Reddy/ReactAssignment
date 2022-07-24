import React, { useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import { Link, RouteComponentProps } from "react-router-dom";
import { Form } from "react-bootstrap";

import './css/common.css';

const NavigationMenu = () => {
    useEffect(() => {
        if (window.location.pathname === "/movies-in-theaters") {
            document.querySelector("#moviesInTheatres")?.classList.add("active");
            document.querySelector("#moviesComing")?.classList.remove("active");
            document.querySelector("#topRatedIndia")?.classList.remove("active");
            document.querySelector("#topRatedMovies")?.classList.remove("active");
            document.querySelector("#favouritMovies")?.classList.remove("active");
        } if (window.location.pathname === "/movies-coming") {
            document.querySelector("#moviesInTheatres")?.classList.remove("active");
            document.querySelector("#moviesComing")?.classList.add("active");
            document.querySelector("#topRatedIndia")?.classList.remove("active");
            document.querySelector("#topRatedMovies")?.classList.remove("active");
            document.querySelector("#favouritMovies")?.classList.remove("active");
        } if (window.location.pathname === "/top-rated-india") {
            document.querySelector("#moviesInTheatres")?.classList.remove("active");
            document.querySelector("#moviesComing")?.classList.remove("active");
            document.querySelector("#topRatedIndia")?.classList.add("active");
            document.querySelector("#topRatedMovies")?.classList.remove("active");
            document.querySelector("#favouritMovies")?.classList.remove("active");
        } if (window.location.pathname === "/top-rated-movies") {
            document.querySelector("#moviesInTheatres")?.classList.remove("active");
            document.querySelector("#moviesComing")?.classList.remove("active");
            document.querySelector("#topRatedIndia")?.classList.remove("active");
            document.querySelector("#topRatedMovies")?.classList.add("active");
            document.querySelector("#favouritMovies")?.classList.remove("active");
        } if (window.location.pathname === "/favourit") {
            document.querySelector("#moviesInTheatres")?.classList.remove("active");
            document.querySelector("#moviesComing")?.classList.remove("active");
            document.querySelector("#topRatedIndia")?.classList.remove("active");
            document.querySelector("#topRatedMovies")?.classList.remove("active");
            document.querySelector("#favouritMovies")?.classList.add("active");
        }
    })
    return (
        <>
            <Nav
                defaultActiveKey="movies-in-theaters"
                style={{ width: "80%" }}
            >
                <Nav.Item>
                    <Nav.Link eventKey="movies-in-theaters" as={Link} to="/movies-in-theaters" id="moviesInTheatres">Movies in Theatres</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="movies-coming" as={Link} to="/movies-coming" id="moviesComing">Coming Soon</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="top-rated-india" as={Link} to="/top-rated-india" id="topRatedIndia">Top Rated Indian</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="top-rated-movies" as={Link} to="/top-rated-movies" id="topRatedMovies">Top Rated Movies</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="favourit" as={Link} to="/favourit" id="favouritMovies">Favorites Movies</Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    )
}

export default NavigationMenu;