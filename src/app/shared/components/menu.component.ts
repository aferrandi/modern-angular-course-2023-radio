import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  template: `
    <button (click)="to()"  
    class="mb-2 mr-2 rounded-lg border border-gray-300 bg-white px-5 py-25 text-sm font-medium text-gray-900 
    hover:bg-gray-100 focus: outline-none focus:ring-4 focus:ring-gray-200">
    {{label}} {{counter}}
    </button>
  `,
  styles: [],
})
export class MenuComponent {
  @Input({required: true})
  label: string | null = null;

  @Input()
  counter:  number | null = null;

  @Output()
  handleClick = new EventEmitter<void>();

  to() {
    this.handleClick.emit();
  }

}
