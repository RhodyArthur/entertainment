import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState} from "./appstate";
import {Movies} from "../interface/movies";

export const selectFeatureState = createFeatureSelector<AppState>('movies');

//select all movies
export const selectAllMovies = createSelector(
    selectFeatureState,
    (state: AppState) => state.movies
)

// select search item
export const selectSearchItem = createSelector(
    selectFeatureState,
    (state: AppState) => state.searchItem
)

export const selectBookMarkedMovies = createSelector(
    selectFeatureState,
    (state) => state.bookedMarkedMovies
);


// select filtered category
export const selectFilteredMovies = (category: string | null) => createSelector(
    selectAllMovies,
    selectSearchItem,
    (allMovies: Movies[], searchTerm:string = '') => {
        return allMovies.filter((movie) => {
            const searchMatch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());

            const categoryMatch = !category || movie.category.toLowerCase() === category.toLowerCase();
            return searchMatch && categoryMatch
        })
    }



)
