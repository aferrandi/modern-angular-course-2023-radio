import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared.module';
import { Getters, State } from 'src/app/store';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SharedModule],
  template: `
    <footer class="my-5 bg-white">
      <pre class="font-bold">
        todos: {{ store().todos.length}} | posts: {{ store().posts.length}}
      </pre>
      <pre>Combined posts and todos: {{total() }}
    `,
  styles: [],
})
export class FooterComponent {
  private _stateService = inject(State);
  store = this._stateService.store;
  private _gettersService = inject(Getters);
  total = this._gettersService.totalObjects;

}
