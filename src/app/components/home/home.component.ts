import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Movies} from "../../interface/movies";
import {AppState} from "../../store/appstate";
import {Store} from "@ngrx/store";
import { selectBookMarkedMovies, selectFilteredMovies } from "../../store/movies.selectors";
import {AsyncPipe, NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {SearchComponent} from "../search/search.component";
import {MenuComponent} from "../menu/menu.component";
import {TrendsComponent} from "./trends/trends.component";
import {CardComponent} from "./card/card.component";
import {BookmarkComponent} from "../bookmark/bookmark.component";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        NgIf,
        AsyncPipe,
        SearchComponent,
        MenuComponent,
        TrendsComponent,
        CardComponent,
        BookmarkComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    movies$!: Observable<Movies[]>;
    category!: string | null;
    trends: Movies[] = [];


    constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.category = params['category'] || null
            this.movies$ = this.store.select(selectFilteredMovies(this.category))

            // clear trends
            this.trends = [];

            // get trends
            this.getTrends();
        })
    }

    // get trends across categories
    getTrends() {
        this.movies$.subscribe(movies => {
            movies.forEach(movie => {
                if (movie.isTrending) {
                    this.trends.push(movie)
                }
            })
        })
    }

//     get page name
    getName() {
        if (this.category === 'movie') {
            return 'Movies'
        } else if (this.category === 'tv series') {
            return 'TV Series'
        } else if (this.category === 'bookmark') {
            return
        } else {
            return 'Recommended for you'
        }
    }
}
