import { Routes } from '@angular/router';
import {LoginComponent} from "./components/form/login/login.component";
import {SignupComponent} from "./components/form/signup/signup.component";
import {AuthGuard} from "./guard/auth.guard";

export const routes: Routes = [

    {path: '',
     loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
    },
    {path: 'category/:category',
     loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
    },
    // {path: 'category/bookmark',
    //  loadComponent: () => import('./components/bookmark/bookmark.component').then(m => m.BookmarkComponent),
    //     canActivate: [AuthGuard]
    // },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'signup', component: SignupComponent
    }

];
