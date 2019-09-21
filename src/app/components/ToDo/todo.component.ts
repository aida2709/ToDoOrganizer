import { OnInit, Component } from '@angular/core';
import { ToDoService } from 'src/app/services/ToDoService';
import { TranslateService } from 'src/app/services/translate';
import { ToDoItem } from 'src/app/interfaces/ToDoItem';


@Component({
    selector: 'home',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
})

export class ToDoComponent implements OnInit {
    public newToDo: ToDoItem;
    public todoList: ToDoItem[];
    public doneList: ToDoItem[];

    constructor(private _todoService: ToDoService, private _translateService: TranslateService) {

    }


    ngOnInit(): void {
        this.getToDoList();
        this.getDoneList();
    }

    getToDoList() {
        this.todoList = this._todoService.getTodoList();
    }

    getDoneList() {
        this.doneList = this._todoService.getDoneList();
    }

    onAddToDoItemClicked() {
        this.newToDo = new ToDoItem();
        this.newToDo.Title = '';
        this.newToDo.IsFinished = false;
    }

    addToDo() {
        if (this.newToDo.Title.trim() == '') {
            return;
        }

        if (this.newToDo.IsFinished == true) {
            this._todoService.addDone(this.newToDo);
            this.getDoneList();
        }
        else {
            this._todoService.addToDo(this.newToDo);
            this.getToDoList();
        }

        this.newToDo = null;
    }

    onToDoItemStatusChanged(item: ToDoItem) {
        if (this._todoService.removeToDoItem(item)) {
            this._todoService.addDone(item);
            this.getToDoList();
            this.getDoneList();
        }
    }

    onDoneItemStatusChanged(item: ToDoItem) {
        if (this._todoService.removeDoneItem(item)) {
            this._todoService.addToDo(item);
            this.getToDoList();
            this.getDoneList();
        }
    }

    onDeleteAllDoneItemsClicked() {
        this._todoService.removeAllDoneItems();
        this.getDoneList();
    }

    onDeleteToDoItemClicked(item) {
        if (this._todoService.removeToDoItem(item)) {
            this.getToDoList();
        }
    }

    onDeleteDoneItemClicked(item) {
        if (this._todoService.removeDoneItem(item)) {
            this.getDoneList();
        }
    }

}