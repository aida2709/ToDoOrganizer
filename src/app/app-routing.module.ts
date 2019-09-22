import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/Login/login.component';
import { ToDoComponent } from './components/ToDo/todo.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: ToDoComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
