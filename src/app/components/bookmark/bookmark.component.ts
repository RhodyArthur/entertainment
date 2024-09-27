import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.scss'
})
export class BookmarkComponent implements OnInit{

    constructor(private store: Store) {}

    ngOnInit() {

    }
}
