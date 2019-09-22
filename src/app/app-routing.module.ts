import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginCompoent } from './components/Login/login.component';
import { ToDoComponent } from './components/ToDo/todo.component';


const routes: Routes = [
  { path: 'login', component: LoginCompoent },
  { path: 'home', component: ToDoComponent },
  { path: '', component: LoginCompoent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
