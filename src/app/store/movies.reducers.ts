// define shape of state
import {AppState} from "./appstate";
import {createReducer, on} from "@ngrx/store";
import {loadMovies, loadMoviesFailure, loadMoviesSuccess, setBookMardkedMovie, setSearchMovie} from "./movies.actions";

// set initial state
export const initialState: AppState = {
    movies: [],
    error: null,
    searchItem: '',
    bookedMarkedMovies: []
}

// create reducer functions
export const moviesReducer = createReducer(
    // first takes the initial state
    initialState,

    // handle actions
    on(loadMovies, (state) => ({...state})),
    on(loadMoviesSuccess, (state, {movies}) => {
        const updatedMovies = movies.map(movie => (
            {...movie,
                isBookmarked: movie.isBookmarked ? false : movie.isBookmarked})
            )
        return {...state, movies: updatedMovies}
    }),
    on(loadMoviesFailure, (state, {error}) => ({...state, error})),

    on(setSearchMovie, (state, {searchItem}) => ({...state, searchItem})),

    on(setBookMardkedMovie, (state, {movieTitle}) => {
        const updatedMovies = state.movies.map(movie => {
            if (movie.title === movieTitle) {
                return {
                    ...movie,
                    isBookmarked: !movie.isBookmarked
                };
            }
            return movie;
        })

        // Create a new array of bookmarked movies based on updatedMovies
        const bookMarkedMovies = updatedMovies.filter(movie => movie.isBookmarked);

        return {...state, movies: updatedMovies, bookedMarkedMovies: bookMarkedMovies}
    })
)

