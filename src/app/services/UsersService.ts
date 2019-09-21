import { Injectable } from '@angular/core'
import { User } from '../interfaces/User';


@Injectable()
export class UsersService {

    public user: User;

    login(email, password, rememberMe): boolean {
        if (email == "test@test.com" && password == "test") {
            this.user = new User();
            this.user.Email = email;
            this.user.Username = "Test";
            this.user.RememberMe=rememberMe;

            localStorage.setItem('loggedUser', JSON.stringify(this.user));

            return true;
        }
        return false;
    }

    isLogged(): boolean {
        var data = localStorage.getItem('loggedUser');

        if (data) {
            this.user = JSON.parse(data);
            if (this.user && this.user.RememberMe == true) {
                return true;
            }
            return false;
        }
        return false;
    }

    logout():void {
        localStorage.removeItem('loggedUser');
    }
}