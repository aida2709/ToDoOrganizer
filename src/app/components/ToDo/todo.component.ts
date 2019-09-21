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
    public todoList: ToDoItem[];
    public doneList: ToDoItem[];

    constructor(private _todoService: ToDoService, private _translateService: TranslateService) {

    }


    ngOnInit(): void {
        this.todoList = this._todoService.getTodoList();
        this.doneList = this._todoService.getDoneList();
    }
}