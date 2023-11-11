import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { TodosStore } from './todo.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoItemComponent } from './todo-item.component';
import { provideComponentStore } from '@ngrx/component-store';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatProgressSpinnerModule,
    TodoItemComponent,
    LetDirective,
  ],
  providers: [provideComponentStore(TodosStore)],
  template: `
    <ng-container *ngrxLet="vm$ as vm">
      <mat-spinner [diameter]="20" color="blue" *ngIf="vm.loading">
      </mat-spinner>
      <ng-container *ngIf="vm.error; else noError">
        Error has occured: {{ vm.error }}
      </ng-container>
      <ng-template #noError>
        <div class="todo-container">
          <app-todo-item *ngFor="let todo of vm.todos" [todo]="todo">
          </app-todo-item>
        </div>
      </ng-template>
    </ng-container>
  `,
  styles: [
    `
      .todo-container {
        display: flex;
        flex-direction: column;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  private todosStore = inject(TodosStore);

  vm$ = this.todosStore.vm$;
}
