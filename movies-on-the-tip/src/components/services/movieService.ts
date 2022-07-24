import IMovie from "../../models/IMovie";
import axios from "axios";
import IFavMovie from "../../models/IFavMovie";


const getMovieByTitle = (category: string, title: string) => {
    let data;
    title = encodeURIComponent(title);
    console.log(`${process.env.REACT_APP_API_BASE_URL}/${category}?title=${title}`);
    data = axios.get<IMovie[]>(`${process.env.REACT_APP_API_BASE_URL}/${category}?title=${title}`)
        .then((response) => response.data);
    return data;
};

const getMoviesByCategory = (category: string) => {
    let data;
    data = axios.get<IMovie[]>(`${process.env.REACT_APP_API_BASE_URL}/${category}`)
        .then((response) => response.data)

    return data;
};

const filterMoviesBySeachString = (category: string, searchString: string) => {
    if (category === "" || category === undefined) {
        category = "movies-in-theaters";
    }
    return axios.get<IMovie[]>(`${process.env.REACT_APP_API_BASE_URL}/${category}`)
        .then(response => response.data as IMovie[])
        .then(response => response.filter(
            (movie) => movie.title.toLowerCase().includes(searchString.toLowerCase())));
};

const addMovieToFavorites = (movieItem: Omit<IMovie, 'category'>, category: string) => {
    return axios.post<IFavMovie>(
        `${process.env.REACT_APP_API_BASE_URL}/favourit`,
        movieItem,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
        .then(response => response.data)
};

const deleteMovieToFavorites = (movieItem: Omit<IFavMovie, 'category'>, category: string) => {
    return axios.delete<IFavMovie>(
        `${process.env.REACT_APP_API_BASE_URL}/favourit/${movieItem.id}`
    )
        .then(response => response.data)
};

export { getMovieByTitle, getMoviesByCategory, filterMoviesBySeachString, addMovieToFavorites, deleteMovieToFavorites };