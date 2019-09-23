import { OnInit, Component } from '@angular/core';
import { UsersService } from 'src/app/services/UsersService';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app/services/translate';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    private isError: boolean = false;
    private errorMessage: string;
    private showPassword = false;
    loginForm: FormGroup;
    private submitted: boolean=false;

    constructor(private _formBuilder: FormBuilder, private _usersService: UsersService, private router: Router, private _translateService: TranslateService) {
        if (_usersService.isLogged() && _usersService.isRememberMeActivated()) {
            this.router.navigate(['/home']);
        }
        else{
            localStorage.removeItem('loggedUser');
        }
    }

    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required],
            'rememberMe': false
        })
    }


    onSignInClicked(value: any) {
        this.submitted=true;
        if (!this.loginForm.valid)
            return;

        var result = this._usersService.login(value.email, value.password, value.rememberMe);

        if (result == true) {
            this.isError = false;
            this.router.navigate(['home']);
        }
        else {
            this.isError = true;
            this.errorMessage = this._translateService.instant("_USER_DATA_NOT_VALID");
        }
    }

    toggle() {
        this.showPassword = !this.showPassword;
        if (this.showPassword) {
            document.getElementById('passwordId').setAttribute('type', 'text');
        } else {
            document.getElementById('passwordId').setAttribute('type', 'password');

        }
    }
}