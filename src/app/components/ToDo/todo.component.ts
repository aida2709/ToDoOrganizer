import { OnInit, Component } from '@angular/core';
import { ToDoService } from 'src/app/services/ToDoService';
import { TranslateService } from 'src/app/services/translate';
import { ToDoItem } from 'src/app/interfaces/ToDoItem';
import { UsersService } from 'src/app/services/UsersService';
import { Router } from '@angular/router';


@Component({
    selector: 'home',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
})

export class ToDoComponent implements OnInit {
    public newToDo: ToDoItem;
    public todoList: ToDoItem[];
    public doneList: ToDoItem[];
    public selectedItemId: any = null;
    public selectedItemForImageUpload: ToDoItem = null;
    public showDropdown: boolean = false;

    constructor(private _todoService: ToDoService, private _translateService: TranslateService,
        private _usersService: UsersService,
        private _router: Router) {

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
        //document.getElementById('newtodo-title').focus();
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

        this.showDropdown = false;
        this.selectedItemId = null;
    }

    onDeleteDoneItemClicked(item) {
        if (this._todoService.removeDoneItem(item)) {
            this.getDoneList();
        }
    }

    onShowDropDownClicked(item: ToDoItem) {
        this.showDropdown = !this.showDropdown;
        this.selectedItemId = item.Id;
    }

    editToDo(item: ToDoItem) {
        this._todoService.editToDoItem(item);
        this.getToDoList();
    }

    uploadImage(item: ToDoItem) {
        this.selectedItemForImageUpload = item;
        document.getElementById('imgupload').click();
    }

    onUploadImageClicked($event) {
        if (this.selectedItemForImageUpload == null) {
            this.showDropdown = false;
            return;
        }

        var reader = new FileReader();
        reader.onload = (e: Event) => {
            localStorage.setItem('image',  reader.result.toString());
        }

        reader.readAsDataURL($event.target.files[0]);

        let image = localStorage.getItem('image');
        this.selectedItemForImageUpload.Image = image;
        localStorage.removeItem('image');
        this._todoService.editToDoItem(this.selectedItemForImageUpload);
        this.getToDoList();

        this.selectedItemForImageUpload = null;
        this.showDropdown = false;
    }
}