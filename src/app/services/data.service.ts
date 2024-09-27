import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Movies} from "../interface/movies";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
    apiUrl: string = './assets/data.json'
    constructor(private http: HttpClient) { }

    // fetch movies data
    getMoviesData(): Observable<Movies[]> {
      return this.http.get<Movies[]>(this.apiUrl)
          .pipe(
              retry(2),
              catchError(err => {
                  console.error('Error occurred while fetching data:', err);
                  return throwError(() => new Error('Error occurred while fetching data', err))
              })
          )
    }
}
