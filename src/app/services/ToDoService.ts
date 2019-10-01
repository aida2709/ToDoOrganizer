import { Injectable } from '@angular/core'
import { ToDoItem } from '../interfaces/ToDoItem';


@Injectable()
export class ToDoService {
    private todoList: ToDoItem[];
    private doneList: ToDoItem[];

    private sortByPosition(a, b) {
        return b.Position - a.Position;
    }

    public getTodoList() {
        this.todoList = JSON.parse(localStorage.getItem('todoList'));

        if (!this.todoList)
            return null;

        return this.todoList.sort(this.sortByPosition);
    }

    public getDoneList() {
        this.doneList = JSON.parse(localStorage.getItem('doneList'));

        if (!this.doneList)
            return null;

        return this.doneList.sort(this.sortByPosition);
    }

    public addToDo(toDoItem: ToDoItem) {
        toDoItem.IsFinished = false;
        toDoItem.Position = this.getPositionForToDoItem();

        if (!toDoItem.Id)//if item already has its id, do not update it
            toDoItem.Id = this.getNextId();

        this.todoList = JSON.parse(localStorage.getItem('todoList'));

        if (!this.todoList) {
            this.todoList = [];
        }

        this.todoList.push(toDoItem);
        localStorage.setItem('todoList', JSON.stringify(this.todoList));
    }

    public addDone(toDoItem: ToDoItem) {
        toDoItem.IsFinished = true;
        toDoItem.Position = this.getPositionForDoneItem();

        if (!toDoItem.Id)//if item already has its id, do not update it
            toDoItem.Id = this.getNextId();

        this.doneList = JSON.parse(localStorage.getItem('doneList'));

        if (!this.doneList) {
            this.doneList = [];
        }

        this.doneList.push(toDoItem);
        localStorage.setItem('doneList', JSON.stringify(this.doneList));
    }

    public removeToDoItem(toDoItem: ToDoItem): boolean {
        this.todoList = JSON.parse(localStorage.getItem('todoList'));

        if (this.todoList) {
            let i = this.todoList.findIndex(x => x.Id === toDoItem.Id);
            if (i < 0)
                return false;
            this.todoList.splice(i, 1);
            localStorage.setItem('todoList', JSON.stringify(this.todoList));
            return true;
        }

        return false;
    }

    public removeDoneItem(doneItem: ToDoItem): boolean {
        this.doneList = JSON.parse(localStorage.getItem('doneList'));

        if (this.doneList) {
            let i = this.doneList.findIndex(x => x.Id === doneItem.Id);
            if (i < 0)
                return false;

            this.doneList.splice(i, 1);
            localStorage.setItem('doneList', JSON.stringify(this.doneList));
            return true;
        }

        return false;
    }

    public removeAllDoneItems(): void {
        localStorage.removeItem('doneList');
    }

    private getNextId(): number {
        this.todoList = JSON.parse(localStorage.getItem('todoList'));
        this.doneList = JSON.parse(localStorage.getItem('doneList'));
        let id = 1;

        if (this.todoList) {
            this.todoList.map(function (obj) {
                if (obj.Id >= id)
                    id = obj.Id + 1;
            });
        }

        if (this.doneList) {
            this.doneList.map(function (obj) {
                if (obj.Id >= id)
                    id = obj.Id + 1;
            });
        }

        return id;
    }

    private getPositionForToDoItem(): number {
        this.todoList = JSON.parse(localStorage.getItem('todoList'));
        let position = 1;

        if (this.todoList) {
            this.todoList.map(function (obj) {
                if (obj.Position >= position)
                    position = obj.Position + 1;
            });
        }

        return position;
    }

    private getPositionForDoneItem(): number {
        this.doneList = JSON.parse(localStorage.getItem('doneList'));
        let position = 1;

        if (this.doneList) {
            this.doneList.map(function (obj) {
                if (obj.Position >= position)
                    position = obj.Position + 1;
            });
        }

        return position;
    }

    public editToDoItem(editedItem: ToDoItem): void {
        this.todoList = JSON.parse(localStorage.getItem('todoList'));

        if (this.todoList) {
            let i=this.todoList.findIndex(x=> x.Id === editedItem.Id);
            if(i>=0){
                this.todoList.splice(i, 1, editedItem)
                localStorage.setItem('todoList', JSON.stringify(this.todoList));
            }
        }
    }

    public addToDoOnSpecificPosition(toDoItem: ToDoItem, index: number) {
        toDoItem.IsFinished = false;

        if (!toDoItem.Id)//if item already has its id, do not update it
            toDoItem.Id = this.getNextId();

        this.getTodoList();

        if (!this.todoList || this.todoList === [] || this.todoList === null) {
            this.todoList = [];
            toDoItem.Position = 1;
            this.todoList.push(toDoItem);
        }
        else {
            this.todoList.splice(index, 0, toDoItem);
            //sort items
            let count = this.todoList.length;
            for (let i = 0; i < count; i++) {
                this.todoList[i].Position = count - i;
            }
        }

        localStorage.setItem('todoList', JSON.stringify(this.todoList));
    }

    public addDoneItemOnSpecificPosition(toDoItem: ToDoItem, index: number) {
        toDoItem.IsFinished = true;

        if (!toDoItem.Id)//if item already has its id, do not update it
            toDoItem.Id = this.getNextId();

        this.getDoneList();

        if (!this.doneList || this.doneList === [] || this.doneList === null) {
            this.doneList = [];
            toDoItem.Position = 1;
            this.doneList.push(toDoItem);
        }
        else {
            this.doneList.splice(index, 0, toDoItem);
            //sort items
            let count = this.doneList.length;
            for (let i = 0; i < count; i++) {
                this.doneList[i].Position = count - i;
            }
        }

        localStorage.setItem('doneList', JSON.stringify(this.doneList));
    }
}