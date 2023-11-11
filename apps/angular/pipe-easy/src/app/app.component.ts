import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PersonPipe } from './person.pipe';

@Component({
  standalone: true,
  imports: [NgFor, PersonPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of ['toto', 'jack']; let index = index">
      {{ person | person : index }}
    </div>
  `,
})
export class AppComponent {}
