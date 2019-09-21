import { OnInit, Component } from '@angular/core';
import { UsersService } from 'src/app/services/UsersService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UsersService]
})

export class LoginCompoent implements OnInit {
    private isError: boolean = false;
    private errorMessage: string;
    loginForm: FormGroup;

    constructor(_formBuilder: FormBuilder, private _usersService: UsersService, private router: Router) {
        if (_usersService.isLogged())
            this.router.navigate(['/home']);


        this.loginForm = _formBuilder.group({
            'email': [null, Validators.required],
            'password': [null, Validators.required],
            'rememberMe': false
        })
    }

    ngOnInit(): void {
    }


    onSignInClicked(value: any) {

        var result = this._usersService.login(value.email, value.password, value.rememberMe);

        if (result == true) {
            alert('Uspjeh');
            this.isError = false;
            this.router.navigate['/home'];
        }
        else {
            this.isError = true;
            this.errorMessage = "Korisnički podaci nisu ispravni";
        }
    }
}