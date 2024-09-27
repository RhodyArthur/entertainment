import {Component, Input} from '@angular/core';
import {Movies} from "../../../interface/movies";
import {Store} from "@ngrx/store";
import {setBookMardkedMovie} from "../../../store/movies.actions";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

    @Input() movies!: Movies[];

    constructor(private store: Store) {
    }

    // toggle bookmark
    markAsBookmark(movieTitle:string) {
        this.store.dispatch(setBookMardkedMovie({movieTitle}))
    }
}
