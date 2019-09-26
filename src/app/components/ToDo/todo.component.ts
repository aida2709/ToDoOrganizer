import { OnInit, Component } from '@angular/core';
import { ToDoService } from 'src/app/services/ToDoService';
import { TranslateService } from 'src/app/services/translate';
import { ToDoItem } from 'src/app/interfaces/ToDoItem';
import { UsersService } from 'src/app/services/UsersService';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
    selector: 'home',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
})

export class ToDoComponent implements OnInit {
    public newToDo: ToDoItem;
    public image: any;
    public transferedObject: ToDoItem;
    public isCheckboxClicked: boolean = false;

    public todoList: ToDoItem[];
    public doneList: ToDoItem[];
    public selectedItemId: any = null;
    public selectedItemForImageUpload: ToDoItem = null;
    public showDropdown: boolean = false;

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
        if (!this.newToDo || !this.newToDo.Title || this.newToDo.Title.trim() === '') {
            this.newToDo = null;
            return;
        }

        if (this.newToDo.IsFinished) {
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

    onUploadImageClicked(event) {
        if (!this.selectedItemForImageUpload) {
            this.showDropdown = false;
            return;
        }

        let reader = new FileReader();
        let file = event.target.files[0];

        if (event.target.files && event.target.files[0]) {
            reader.readAsDataURL(file);

            reader.onload = () => {
                this.image = reader.result;
                this.selectedItemForImageUpload.Image = this.image.toString();
                this._todoService.editToDoItem(this.selectedItemForImageUpload);
                this.getToDoList();
            }

            this.showDropdown = false;
        }
    }

    onDrop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data,
                event.previousIndex,
                event.currentIndex);

            let item = JSON.stringify(event.previousContainer.data[event.currentIndex]);
            if (item)
                this.transferedObject = JSON.parse(item);

            if (this.transferedObject.IsFinished) {
                if (this._todoService.removeDoneItem(this.transferedObject)) {
                    this._todoService.addDoneItemOnSpecificPosition(this.transferedObject, event.currentIndex);
                }
            }
            else {
                if (this._todoService.removeToDoItem(this.transferedObject)) {
                    this._todoService.addToDoOnSpecificPosition(this.transferedObject, event.currentIndex);
                }
            }
        } else {
            let item = JSON.stringify(event.previousContainer.data[event.previousIndex]);
            if (item) {
                this.transferedObject = JSON.parse(item);

                if (this.transferedObject.IsFinished) {
                    if (this._todoService.removeDoneItem(this.transferedObject)) {
                        this._todoService.addToDoOnSpecificPosition(this.transferedObject, event.currentIndex);
                    }
                }
                else {

                    if (this._todoService.removeToDoItem(this.transferedObject)) {
                        this._todoService.addDoneItemOnSpecificPosition(this.transferedObject, event.currentIndex);
                    }
                }
            }

            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex, event.currentIndex);
        }
    }
}