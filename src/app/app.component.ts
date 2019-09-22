import { Component } from '@angular/core';
import { TranslateService } from './services/translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDoOrganizer';

  constructor(_translateService: TranslateService) {
    _translateService.use('en');
  }
}
