/*app.component.ts*/
import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
//var CanvasJS = require('./canvasjs.min');

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  ngOnInit() {
    let dataPoints = [
      { y: 71 },
      { y: 55 },
      { y: 50 },
      { y: 65 },
      { y: 95 },
      { y: 68 },
      { y: 28 },
      { y: 34 },
      { y: 14 }
    ];

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Basic Column Chart in Angular 5"
      },
      data: [{
        type: "column",
        dataPoints: dataPoints
      }]
    });
    chart.render();
  }
}
