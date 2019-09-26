import { Injectable } from '@angular/core'
import { User } from '../interfaces/User';


@Injectable()
export class UsersService {

    private user: User;

    public login(email, password, rememberMe): boolean {
        if (email === "test@test.com" && password === "test") {
            this.user = new User();
            this.user.Email = email;
            this.user.Username = "Username";
            this.user.RememberMe = rememberMe;

            localStorage.setItem('loggedUser', JSON.stringify(this.user));

            return true;
        }
        return false;
    }

    public isLogged(): boolean {
        var data = localStorage.getItem('loggedUser');

        if (data) {
            this.user = JSON.parse(data);
            if (this.user) {
                return true;
            }
            return false;
        }
        return false;
    }

    public isRememberMeActivated(): boolean {
        var data = localStorage.getItem('loggedUser');

        if (data) {
            this.user = JSON.parse(data);
            return (this.user && this.user.RememberMe);
        }
        return false;
    }

    public logout(): void {
        localStorage.removeItem('loggedUser');
    }

    public getUsername(): string {
        this.user = JSON.parse(localStorage.getItem('loggedUser'));

        return this.user ? this.user.Username : '';
    }
}