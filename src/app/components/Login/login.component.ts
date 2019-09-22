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

export class LoginCompoent implements OnInit {
    private isError: boolean = false;
    private errorMessage: string;
    private showPassword = false;
    loginForm: FormGroup;

    constructor(private _formBuilder: FormBuilder, private _usersService: UsersService, private router: Router, private _translateService: TranslateService) {
        if (_usersService.isLogged()){
            this.router.navigate(['/home']);
        }
    }

    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            'email': [null, Validators.required],
            'password': [null, Validators.required],
            'rememberMe': false
        })
    }


    onSignInClicked(value: any) {
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
            document.getElementById('togglePassword').className="fa fa-lg fa-eye-slash toggle-password";
        } else {
            document.getElementById('passwordId').setAttribute('type', 'password');
            document.getElementById('togglePassword').className="fa fa-lg fa-eye toggle-password";

        }
      }
}