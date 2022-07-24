import React from 'react';
import ReactDOM from 'react-dom/client';
import NavigationMenu from './components/common/NavigationMenu';
import MovieInfo from './components/moviesList/MovieInfo';
import MoviesList from './components/moviesList/MoviesList';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
// import mode from './../../data/json/data.json';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
);
