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
    errorMessage: string | null = null;
    isLoading: boolean = false;

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

            // show loading indicator
            this.isLoading = true;

            this.authService.login(loginData).subscribe(
                () => {
                    this.router.navigate([''])
                    this.errorMessage = null;
                    this.isLoading = false;
                },
                (error) => {
                    console.error('Login Failed', error);
                    this.errorMessage = 'Invalid email or password';
                    this.isLoading = false;

                    // clear error message after 3 s
                    setTimeout(() => {
                        this.errorMessage= null;
                    },5000)
                })

            this.loginForm.reset();
        }
        else {
            this.loginForm.markAsTouched();
        }
    }
}

