import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

interface Todo {
  id?: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="container">
      <h1>📝 Todo List</h1>
      <p class="subtitle">Application conteneurisée avec Docker</p>

      <div class="add-form">
        <input
          [(ngModel)]="newTitle"
          placeholder="Ajouter une tâche..."
          (keyup.enter)="addTodo()"
        />
        <button (click)="addTodo()">Ajouter</button>
      </div>

      <ul class="todo-list">
        <li *ngFor="let todo of todos" [class.done]="todo.completed">
          <input
            type="checkbox"
            [checked]="todo.completed"
            (change)="toggleTodo(todo)"
          />
          <span>{{ todo.title }}</span>
          <button class="delete" (click)="deleteTodo(todo)">✕</button>
        </li>
      </ul>

      <p *ngIf="todos.length === 0" class="empty">Aucune tâche pour l'instant.</p>
    </div>
  `,
  styles: [`
    body { font-family: 'Segoe UI', sans-serif; background: #f0f2f5; }
    .container { max-width: 600px; margin: 60px auto; background: white; border-radius: 12px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    h1 { margin: 0 0 4px; font-size: 28px; color: #1a1a2e; }
    .subtitle { color: #888; margin: 0 0 24px; font-size: 14px; }
    .add-form { display: flex; gap: 10px; margin-bottom: 24px; }
    input[type=text], input:not([type=checkbox]) { flex: 1; padding: 10px 14px; border: 1.5px solid #ddd; border-radius: 8px; font-size: 15px; outline: none; }
    input:focus { border-color: #4f46e5; }
    button { padding: 10px 20px; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 15px; }
    button:hover { background: #4338ca; }
    .todo-list { list-style: none; padding: 0; margin: 0; }
    li { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
    li.done span { text-decoration: line-through; color: #aaa; }
    li span { flex: 1; font-size: 15px; }
    .delete { padding: 4px 10px; background: #fee2e2; color: #dc2626; font-size: 13px; }
    .delete:hover { background: #fecaca; }
    .empty { text-align: center; color: #aaa; margin-top: 20px; }
  `]
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  newTitle = '';

  private apiUrl = '/api/todos';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.http.get<Todo[]>(this.apiUrl).subscribe(data => this.todos = data);
  }

  addTodo() {
    if (!this.newTitle.trim()) return;
    const todo: Todo = { title: this.newTitle, completed: false };
    this.http.post<Todo>(this.apiUrl, todo).subscribe(created => {
      this.todos.push(created);
      this.newTitle = '';
    });
  }

  toggleTodo(todo: Todo) {
    const updated = { ...todo, completed: !todo.completed };
    this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, updated).subscribe(() => {
      todo.completed = !todo.completed;
    });
  }

  deleteTodo(todo: Todo) {
    this.http.delete(`${this.apiUrl}/${todo.id}`).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== todo.id);
    });
  }
}
