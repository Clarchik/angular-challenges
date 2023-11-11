import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LetDirective } from '@ngrx/component';
import { provideComponentStore } from '@ngrx/component-store';
import { TodoItemStore } from './todo-item.store';
import { Todo } from './todo.model';

@Component({
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule, LetDirective],
  providers: [provideComponentStore(TodoItemStore)],
  selector: 'app-todo-item',
  template: `
    <ng-container *ngrxLet="todoItemStore.vm$ as vm">
      <mat-spinner [diameter]="20" color="blue" *ngIf="vm.loading">
      </mat-spinner>
      {{ vm.todo.title }}
      <button (click)="todoItemStore.updateTodo(vm.todo.id)">Update</button>
      <button (click)="todoItemStore.deleteTodo(vm.todo.id)">Delete</button>
      <div class="error" *ngIf="vm.error">
        An error has occured: {{ vm.error }}
      </div>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: flex;
        gap: 3px;
        .error {
          color: red;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoItemComponent {
  @Input() set todo(todo: Todo) {
    this.todoItemStore.patchState({ todo });
  }
  public readonly todoItemStore = inject(TodoItemStore);
}
