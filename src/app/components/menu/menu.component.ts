import { Component } from '@angular/core';
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-menu',
  standalone: true,
    imports: [
        NgOptimizedImage, RouterLink, RouterLinkActive, AsyncPipe, NgIf
    ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
    showModal:boolean = false;
    loggedIn$!:Observable<boolean>;

    constructor(private  authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.loggedIn$ = this.authService.isLoggedIn();
    }

    displayModal() {
        this.showModal = !this.showModal;
    }
    // navigate to login
    logIn() {
        this.router.navigate(['login'])
    }

    // log user out
    logOut() {
        this.authService.logout();
        this.router.navigate([''])
    }

    closeModal () {
        this.showModal = false;
    }
}
