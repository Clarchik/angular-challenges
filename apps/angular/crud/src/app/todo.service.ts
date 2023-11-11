import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Todo } from './todo.model';
import { randText } from '@ngneat/falso';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);

  getAllTodo = () =>
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');

  update = (id: number) =>
    this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      JSON.stringify({
        id: id,
        title: randText(),
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );

  delete = (id: number) =>
    this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`);
}
