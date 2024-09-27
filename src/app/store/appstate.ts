import {Movies} from "../interface/movies";

export interface AppState {
    movies: Movies[],
    error: string | null,
    searchItem: string,
    bookedMarkedMovies: Movies[]
}
