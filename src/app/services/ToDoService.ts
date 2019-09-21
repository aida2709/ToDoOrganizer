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

    public addToDo(toDoItem: ToDoItem) {
        toDoItem.IsFinished = false;
        toDoItem.Id = this.getNextId();

        this.todoList = JSON.parse(localStorage.getItem('todoList'));

        if (this.todoList == null) {
            this.todoList = [];
        }

        this.todoList.push(toDoItem);
        localStorage.setItem('todoList', JSON.stringify(this.todoList));
    }

    public addDone(toDoItem: ToDoItem) {
        toDoItem.IsFinished = true;
        toDoItem.Id = this.getNextId();

        this.doneList = JSON.parse(localStorage.getItem('doneList'));

        if (this.doneList == null) {
            this.doneList = [];
        }

        this.doneList.push(toDoItem);
        localStorage.setItem('doneList', JSON.stringify(this.doneList));
    }

    public removeToDoItem(toDoItem: ToDoItem):boolean {
        this.todoList = JSON.parse(localStorage.getItem('todoList'));

        if (this.todoList != null) {
            for(let i = 0; i < this.todoList.length; i++){ 
                if (this.todoList[i].Id === toDoItem.Id) {
                  this.todoList.splice(i, 1); 
                  localStorage.setItem('todoList', JSON.stringify(this.todoList));
                  return true;
                }
             }

            return false;
        }

        return false;
    }

    public removeDoneItem(doneItem: ToDoItem):boolean {
        this.doneList = JSON.parse(localStorage.getItem('doneList'));

        if (this.doneList != null) {
            for(let i = 0; i < this.doneList.length; i++){ 
                if (this.doneList[i].Id === doneItem.Id) {
                  this.doneList.splice(i, 1); 
                  localStorage.setItem('doneList', JSON.stringify(this.doneList));
                  return true;
                }
             }

            return false;
        }

        return false;
    }

    public removeAllDoneItems(){
        localStorage.removeItem('doneList');
    }

    private getNextId(): number {
        this.todoList = JSON.parse(localStorage.getItem('todoList'));
        this.doneList = JSON.parse(localStorage.getItem('doneList'));
        let id = 1;

        if (this.todoList != null) {
            this.todoList.map(function (obj) {
                if (obj.Id > id)
                    id = obj.Id + 1;
            });
        }

        if (this.doneList != null) {
            this.doneList.map(function (obj) {
                if (obj.Id > id)
                    id = obj.Id + 1;
            });
        }

        return id;
    }
}