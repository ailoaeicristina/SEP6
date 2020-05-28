import { Component, OnInit, Inject } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  public flightsPerMonth: Map<string, number> = new Map<string, number>();

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Map<string, number>>(baseUrl + 'api/Nycflights/FlightsPerMonth').subscribe(result => {

      let dataPoints = [];

      Object.keys(result).forEach(function (key) {
        dataPoints.push({ label: key, y: result[key] })
        console.log(key + ":" + result[key]);
      });

      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
          text: "Number of flights per month"
        },
        axisX: {
          title: "Month"
        },
        axisY: {
          title: "Number of flights"
        },
        data: [{
          type: "column",
          dataPoints: dataPoints
        }]
      });
      chart.render();

    }, error => console.error(error));
  }


  ngOnInit() { }
}


