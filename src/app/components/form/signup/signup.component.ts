import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-signup',
  standalone: true,
    imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
    registerForm!: FormGroup;
    errorMessage: string = '';

    constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {}

    ngOnInit() {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            repeatPassword: ['', [Validators.required]]
        }, {validators: this.passwordMatchValidator})
    }


    // check if password match
    passwordMatchValidator(form: FormGroup) {
        return form.get('password')?.value === form.get('repeatPassword')?.value
            ? null : { 'mismatch': true };
    }
    onSubmit() {
        if (this.registerForm.valid) {

            const {email, password} = this.registerForm.value;
            const user = {
                email: email,
                password: password
            }
            this.authService.register(user)
                .subscribe(
                    () => {
                        // route to log in after successful registration
                        this.router.navigate(['login'])
                        console.log(user)
                    },
                (error) => {
                    console.error('Registration failed', error);
                    this.errorMessage =
                        error.error?.message || 'Registration failed. Please try again.';
                    }
                )

            // clear form
            this.registerForm.reset();

        }


    }

}
