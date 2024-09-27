import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {userData} from "../interface/userData";
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private registerURL: string = 'https://entertainment-web-app-backend-2.onrender.com/api/register';
    private loginURL = 'https://entertainment-web-app-backend-2.onrender.com/api/login';
    constructor(private http: HttpClient) { }

    // emits authentication status (logged in or not)
    private authStatus = new BehaviorSubject<boolean>(this.hasToken());


    // check if token already exists
    hasToken() : boolean {
        return !!localStorage.getItem('token')
    }

    // retrieve token
    getToken(): string | null {
        return localStorage.getItem('token')
    }

    private setSession(authResult: any) {
        if (authResult && authResult.token) {
            localStorage.setItem('token', authResult.token);
            localStorage.setItem('name', authResult.email || '');
            this.authStatus.next(true);
        } else {
            console.error('Invalid auth result:', authResult);
    }}

    // create new user
    register(user: userData): Observable<any> {
        return  this.http.post(this.registerURL, user)
            .pipe(tap((response:any) => {
                if (response && response.token) {
                    this.setSession(response);
                }}),
                catchError((error) => {
                    console.error('Registration error:', error);
                    throw error;
                })
            );
    }

    isLoggedIn(): Observable<boolean> {
        return this.authStatus.asObservable();
    }

    // log in user
    login(user: userData): Observable<any> {
        return this.http.post(this.loginURL, user)
            .pipe(
                tap((response: any) => {
                    this.setSession(response);
                }),
                catchError((error) => {
                    console.error('Login error:', error);
                    throw error;
                })
            );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        this.authStatus.next(false);
    }

}
