import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginCompoent } from './components/Login/login.component';
import { UsersService } from './services/UsersService';
import { ToDoService } from './services/ToDoService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'login', component: LoginCompoent },
  { path: '', component: LoginCompoent }

];


@NgModule({
  declarations: [
    AppComponent,
    LoginCompoent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UsersService,
    ToDoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
