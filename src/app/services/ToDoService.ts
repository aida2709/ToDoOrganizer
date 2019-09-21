import { Injectable } from '@angular/core'
import { ToDoItem } from '../interfaces/ToDoItem';


@Injectable()
export class ToDoService {
    private todoList: ToDoItem[];
    private doneList: ToDoItem[];

    public getTodoList() {
        this.todoList = JSON.parse(localStorage.getItem('todoList'));
        return this.todoList;
    }

    public getDoneList() {
        this.doneList = JSON.parse(localStorage.getItem('doneList'));
        return this.doneList;
    }
}