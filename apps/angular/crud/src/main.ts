import { bootstrapApplication } from '@angular/platform-browser';
import { TodosComponent } from './app/todos.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(TodosComponent, {
  providers: [importProvidersFrom(HttpClientModule)],
}).catch((err) => console.error(err));
