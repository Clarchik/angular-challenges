import { Injectable, inject } from '@angular/core';
import { randomErrorHttp } from '@angular-challenges/shared/utils';
import { CallStateComponentStore } from '@tomalaforge/ngrx-callstate-store';
import { Todo } from './todo.model';
import { OnStateInit, OnStoreInit, tapResponse } from '@ngrx/component-store';
import { TodoService } from './todo.service';
import { pipe, tap, switchMap } from 'rxjs';

@Injectable()
export class TodosStore
  extends CallStateComponentStore<{
    todos: Todo[];
  }>
  implements OnStateInit, OnStoreInit
{
  private readonly todoService = inject(TodoService);
  private readonly todos$ = this.select((state) => state.todos);

  readonly vm$ = this.select(
    {
      todos: this.todos$,
      loading: this.isLoading$,
      error: this.error$,
    },
    { debounce: true }
  );

  readonly updateTodo = this.updater((state, todo: Todo) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? { ...todo } : t)),
  }));

  readonly deleteTodoState = this.updater((state, todoId: number) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== todoId),
  }));

  readonly fetchTodo = this.effect<void>(
    pipe(
      tap(() => this.startLoading()),
      switchMap(() =>
        randomErrorHttp({
          httpRequest: () => this.todoService.getAllTodo(),
        }).pipe(
          tapResponse(
            (todos) => this.stopLoading({ todos }),
            (error: unknown) => this.handleError(error)
          )
        )
      )
    )
  );

  ngrxOnStoreInit() {
    this.setInitState({ todos: [] });
  }

  ngrxOnStateInit() {
    this.fetchTodo();
  }
}
