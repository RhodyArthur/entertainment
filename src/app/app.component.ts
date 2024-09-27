import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenuComponent} from "./components/menu/menu.component";
import {SearchComponent} from "./components/search/search.component";
import {LoginComponent} from "./components/form/login/login.component";
import {SignupComponent} from "./components/form/signup/signup.component";
import {Store} from "@ngrx/store";
import {AppState} from "./store/appstate";
import {loadMovies} from "./store/movies.actions";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, MenuComponent, SearchComponent, LoginComponent, SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'entertainment-web-app';

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
      this.store.dispatch(loadMovies())
  }
}
