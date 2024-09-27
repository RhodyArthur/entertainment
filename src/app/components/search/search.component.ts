import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {debounceTime, fromEvent, map, Observable, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {setSearchMovie} from "../../store/movies.actions";
import {selectSearchItem} from "../../store/movies.selectors";

@Component({
  selector: 'app-search',
  standalone: true,
    imports: [
        NgIf,
        AsyncPipe
    ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
    category!: string | null;
    searchMovie$!: Observable<string>;
    searchValue!: string;

    constructor(private route: ActivatedRoute, private store: Store) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.category = params['category'] || null
        })

        const searchInput = document.getElementById('search') as HTMLElement;

        fromEvent(searchInput, 'input')
            .pipe(
                map((event: Event) => (
                    event.target as HTMLInputElement).value),
                debounceTime(400),
                tap((query) => {
                    this.store.dispatch(setSearchMovie({searchItem: query}))
                })
            )
            .subscribe();

        this.searchMovie$ = this.store.select(selectSearchItem);
        this.searchMovie$.subscribe(searchMovie => this.searchValue = searchMovie)
    }


//     define placeholders
    getPlaceholders() {
        if (this.category === 'movie') {
            return 'Search for movies'
        }
        else if (this.category === 'tv series') {
            return 'Search for TV series'
        }
        else if(this.category === 'bookmark') {
            return 'Search for bookmarked shows'
        }
        else {
            return 'Search for movies or TV series'
        }
    }


}
