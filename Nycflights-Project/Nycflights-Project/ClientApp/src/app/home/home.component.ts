import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dictionary } from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public flightsPerMonth: FlightsPerMonth

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<FlightsPerMonth>(baseUrl + 'api/Nycflights/FlightsPerMonth').subscribe(result => {
      this.flightsPerMonth = result;
    }, error => console.error(error));
  }
}

interface FlightsPerMonth {
  connection: Map<string, number>;
}
