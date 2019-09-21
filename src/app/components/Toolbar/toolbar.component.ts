import { OnInit, Component } from '@angular/core';
import { UsersService } from 'src/app/services/UsersService';
import { Router } from '@angular/router';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {
    username: string;

    constructor(private _usersService: UsersService, private _router: Router) {
        if (!_usersService.isLogged()){
            this._router.navigate(['/login']);
        }
    }

    ngOnInit(): void {
        this.username = this._usersService.getUsername();
    }

    onLogoutClicked() {
        this._usersService.logout();
        this._router.navigate['/login'];
    }

}