import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/Login/login.component';
import { UsersService } from './services/UsersService';
import { ToDoService } from './services/ToDoService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TRANSLATION_PROVIDERS } from './services/translate/translation';
import { TranslateService } from './services/translate/translate.service';
import { TranslatePipe } from './services/translate';
import { ToDoComponent } from './components/ToDo/todo.component';
import { ToolbarComponent } from './components/Toolbar/toolbar.component';
import {DragDropModule} from '@angular/cdk/drag-drop'

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    LoginComponent,
    ToDoComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DragDropModule
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
