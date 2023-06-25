import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Actions, State} from '../store';


@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [SharedModule],
  template: `
    <h1>{{store().loading ? "loading..": "Todos works!"}}</h1>
    <ul>
      <li *ngFor="let todo of store().todos; let idx = index">
        <span class="mr-5">{{todo.title}}</span>
        <button class=text-red-400 (click)="handleRemoveTodo(idx)">Done</button>
      </li>
    </ul>
  `,
  styles: [],
})
export class TodosComponent implements OnInit {
  private _stateService = inject(State);
  private _actionsService = inject(Actions);

  store = this._stateService.store;

  async ngOnInit() {
    await this._actionsService.fetchTodos();
  }

  handleRemoveTodo(index: number) {
    this._actionsService.removeTodoById(index);
  }
}
