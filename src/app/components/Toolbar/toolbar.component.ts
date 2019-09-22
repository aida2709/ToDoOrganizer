import { OnInit, Component } from '@angular/core';
import { UsersService } from 'src/app/services/UsersService';
import { Router } from '@angular/router';
import { TranslateService } from 'src/app/services/translate';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {
    username: string;
    showDropdown: boolean = false;

    constructor(private _usersService: UsersService, private _router: Router, private _translateService: TranslateService) {
        if (!_usersService.isLogged()) {
            this._router.navigate(['/login']);
        }
    }

    ngOnInit(): void {
        this.username = this._usersService.getUsername();
    }

    onShowDropdownClicked() {
        this.showDropdown = !this.showDropdown;
    }

    onLogoutClicked() {
        this._usersService.logout();
        this._router.navigate(['/login']);
    }

}