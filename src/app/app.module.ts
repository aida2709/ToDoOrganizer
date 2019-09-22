import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginCompoent } from './components/Login/login.component';
import { UsersService } from './services/UsersService';
import { ToDoService } from './services/ToDoService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TRANSLATION_PROVIDERS } from './services/translate/translation';
import { TranslateService } from './services/translate/translate.service';
import { TranslatePipe } from './services/translate';
import { ToDoComponent } from './components/ToDo/todo.component';
import { ToolbarComponent } from './components/Toolbar/toolbar.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginCompoent },
  { path: 'home', component: ToDoComponent },
  { path: '', component: LoginCompoent }

];


@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    LoginCompoent,
    ToDoComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    UsersService,
    ToDoService,
    TRANSLATION_PROVIDERS,
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
