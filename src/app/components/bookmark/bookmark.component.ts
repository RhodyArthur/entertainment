import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {map, Observable} from "rxjs";
import {Movies} from "../../interface/movies";
import {selectBookMarkedMovies} from "../../store/movies.selectors";

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.scss'
})
export class BookmarkComponent implements OnInit{

    bookMarkedMoviesList$!: Observable<Movies[]>;
    movies$!: Observable<Movies[]>;
    tvSeries$!: Observable<Movies[]>;

    constructor(private store: Store) {}


    ngOnInit() {
        this.bookMarkedMoviesList$ = this.store.select(selectBookMarkedMovies);

        this.movies$ = this.bookMarkedMoviesList$.pipe(
          map((movies: Movies[]) => movies.filter(movie => movie.category === 'Movie'))
        )

        this.tvSeries$ = this.bookMarkedMoviesList$.pipe(
          map((movies: Movies[]) => movies.filter(movie => movie.category === 'TV Series'))
        )

        console.log(this.movies$.subscribe(data => console.log(data)))
        console.log(this.tvSeries$.subscribe(data => console.log(data)))
    }
}
