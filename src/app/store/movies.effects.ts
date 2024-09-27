import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {DataService} from "../services/data.service";
import {catchError, map, mergeMap, of, tap} from "rxjs";
import {loadMovies, loadMoviesFailure, loadMoviesSuccess} from "./movies.actions";
import {Movies} from "../interface/movies";

@Injectable()
export class MoviesEffects {

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(loadMovies),
        mergeMap(() => {
            const localStorageMovies = localStorage.getItem('movies');

            // if item in local storage
            if (localStorageMovies) {
                const  movies: Movies[] = JSON.parse(localStorageMovies);
                return of(loadMoviesSuccess({movies}))
            }
            // else fetch data and push to local storage
            else {
                return this.dataService.getMoviesData()
                    .pipe(
                        tap((movies: Movies[]) => {
                            localStorage.setItem('movies', JSON.stringify(movies))
                        }),
                        map(movies => loadMoviesSuccess({movies}),
                            catchError(() => of(loadMoviesFailure({ error: 'Movies Loaded Error' })))
                        ))

            }
        })
        )
    )

    constructor(private actions$: Actions, private dataService: DataService) {}
}
