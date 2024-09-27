import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
                private route: ActivatedRoute) {}

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        })
    }

    onSubmit() {
        if (this.loginForm.valid) {
            const {email, password} = this.loginForm.value;

            const loginData = {
                email: email,
                password: password
            }
            this.authService.login(loginData).subscribe(
                () => {
                    this.router.navigate([''])
                },
                (error) => {
                    console.error('Login Failed')
                })
        }
        else {
            this.loginForm.markAsTouched();
        }
    }
}

