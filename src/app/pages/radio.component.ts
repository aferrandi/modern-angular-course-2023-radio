import { Component, inject } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Actions, State} from '../store';
import { FormBuilder, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UntilDestroy, untilDestroyed } from  '@ngneat/until-destroy';


@UntilDestroy()
@Component({
  selector: 'app-radio',
  standalone: true,
  imports: [SharedModule],
  template: `
    <h1>{{store().loading ? "loading..": "Radio Countries!"}}</h1>
    <form [formGroup]="formFrom">
    <label for="from">From</label>
    <input type="number" id="from" formControlName="from" 
       min="0" [max]="store().radioCountries.length > 10 ? store().radioCountries.length - 10 : 0" s>
    </form>
    <table><tbody>
      <tr><th>Name</th><th>Count</th></tr>
      <tr *ngFor="let country of store().radioCountries">
      <td><button (click)="showRadionStations(country.name)">{{country.name}}</button></td>
      <td>{{country.stationcount}}</td>
    </tbody></table>

    <div *ngIf="store().radioStations.length > 0">
      <h1>Stations {{store().radioStations[0].country}}</h1>

      <table width="100%"><tbody>
        <tr><th width="50%">Name</th><th width="30%">State</th><th width="20%">Icon</th></tr>
        <tr *ngFor="let station of store().radioStations">
        <td><a class="text-blue-400" href="{{station.homepage}}" target="_blank">{{station.name}}</a></td>
        <td>{{station.state}}</td>
        <td><img src="{{station.favicon}}" width="100" height="100"/></td>
      </tbody></table>
  </div>
  `,
  styles: [],
})
export class RadioComponent {
  private _stateService = inject(State);
  private _actionsService = inject(Actions);
  private _formBuilder = inject(FormBuilder);

  formFrom = this._formBuilder.group({
    from: ['', [Validators.required]]
  })

  store = this._stateService.store;

  async ngOnInit() {
    await this._actionsService.fetchRadioCountries(0);
    this.formFrom.controls.from.valueChanges.pipe(
      debounceTime(1000), 
      distinctUntilChanged(), 
      untilDestroyed(this)
    ).subscribe(from => {
      this.fetchRadionCountries(from ? parseInt(from) : 0);
    })
  }
  async fetchRadionCountries(from: number) {
    console.log("From: "+from)
    await this._actionsService.fetchRadioCountries(from);        
  }

  async showRadionStations(country: string) {
      await this._actionsService.fetchRadioStations(country);
  }
}
