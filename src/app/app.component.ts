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

    this.load();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);

    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUdone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  add() {
    const title = this.form.controls.title.value;
    const id = this.todos.length + 1;
    const todo = new Todo(id, title, false);

    this.todos.push(todo);
    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  save() {
    const data = JSON.stringify(this.todos);

    localStorage.setItem('todos', data);
  }

  load() {
    const data = localStorage.getItem('todos');
    if (data) {
     this.todos = JSON.parse(data);
    }
  }
}
