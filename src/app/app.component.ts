import { Component } from '@angular/core';
import { TodoService } from './services/todo.service';
import { IFormField } from 'src/app/components/material-form/material-form.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular 8';
  todos: IFormField[] = [];
  constructor(private todoService: TodoService) {
    this.todos = todoService.editTodo();
  }
  formSubmitted(value: any){
    console.log(value);
  }
}
