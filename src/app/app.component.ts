import { Component } from '@angular/core';
import { Todo } from './models/todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: any[] = [];
  public title: String = 'Minhas tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    });

    this.todos.push(new Todo(1, 'passear com o cachorro', false));
    this.todos.push(new Todo(2, 'ir ao mercado', false));
    this.todos.push(new Todo(3, 'cortar cabelo', true));
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);

    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  markAsDone(todo: Todo) {
    todo.done = true;
  }

  markAsUdone(todo: Todo) {
    todo.done = false;
  }

  add() {
    const title = this.form.controls.title.value;
    const id = this.todos.length + 1;
    const todo: Todo = new Todo(id, title, false);

    this.todos.push(todo);
  }
}
