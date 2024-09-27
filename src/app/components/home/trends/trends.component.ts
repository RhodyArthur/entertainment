import {Component, Input} from '@angular/core';
import {Movies} from "../../../interface/movies";
import {Store} from "@ngrx/store";
import {setBookMardkedMovie} from "../../../store/movies.actions";

@Component({
  selector: 'app-trends',
  standalone: true,
  imports: [],
  templateUrl: './trends.component.html',
  styleUrl: './trends.component.scss'
})
export class TrendsComponent {

    @Input() trends!: Movies[];

    constructor(private store: Store) {}

    // toggle bookmark
    markAsBookmark(movieTitle:string) {
        this.store.dispatch(setBookMardkedMovie({movieTitle}))
    }
}
