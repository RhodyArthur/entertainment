// create actions
import {createAction, props} from "@ngrx/store";
import {Movies} from "../interface/movies";

// load movies
export const loadMovies = createAction('[Movies] Load Movies');

// load movies success
export const loadMoviesSuccess = createAction('[Movies] Load Movies Success',
    props<{movies: Movies[]}>())


//load movies failure
export  const loadMoviesFailure = createAction('[Movies] Load Movies Failure',
    props<{error: string}>())

// search movie
export const setSearchMovie = createAction('[Movie] Set Search Movie',
    props<{searchItem: string}>())

// bookmarked movie
export const setBookMardkedMovie = createAction('[Movies] Set Bookmarked Movie',
    props<{movieTitle: string}>())
