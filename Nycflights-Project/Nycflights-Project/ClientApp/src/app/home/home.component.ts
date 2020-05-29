import { Component, Inject } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html'
})

export class HomeComponent{

  public flightsPerMonth: Map<string, number> = new Map<string, number>();

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    // Feature 1 - Flights per month
    http.get<Map<string, number>>(baseUrl + 'api/Nycflights/FlightsPerMonth').subscribe(result => {

      let dataPoints = [];

      Object.keys(result).forEach(function (key) {
        dataPoints.push({ label: key, y: result[key] })
        console.log(key + ":" + result[key]);
      });

      let chart = new CanvasJS.Chart("chartContainer1", {
        animationEnabled: true,
        title: {
          text: "Number of flights per month"
        },
        axisX: {
          title: "Month",
          interval:1
        },
        axisY: {
          title: "Number of flights"
        },
        data: [{
          type: "column",
          dataPoints: dataPoints,
          color: "#2E86C1"
        }]
      });
      chart.render();

    }, error => console.error(error));

    //Feature 2 - Flights per month from origins
    let dataPointsJFK = [];
    http.get<Map<string, number>>(baseUrl + 'api/Nycflights/FlightsPerMonthForJFK').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsJFK.push({ label: key, y: result[key] })
        console.log(key + ":" + result[key]);
      });
    }, error => console.error(error));

    let dataPointsEWR = [];
    http.get<Map<string, number>>(baseUrl + 'api/Nycflights/FlightsPerMonthForEWR').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsEWR.push({ label: key, y: result[key] })
        console.log(key + ":" + result[key]);
      });
    }, error => console.error(error));

    let dataPointsLGA = [];
    http.get<Map<string, number>>(baseUrl + 'api/Nycflights/FlightsPerMonthForLGA').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsLGA.push({ label: key, y: result[key] })
        console.log(key + ":" + result[key]);
      });

      let chartFrequency = new CanvasJS.Chart("chartContainer2Frequency", {
        animationEnabled: true,
        title: {
          text: "Number of flights per month - frequency"
        },
        axisX: {
          title: "Month",
          interval: 1
        },
        axisY: {
          title: "Number of flights"
        },
        data: [{
          type: "column",
          legendText: "JFK",
          showInLegend: true,
          dataPoints: dataPointsJFK,
          color: "#2E86C1"
          },
          {
            type: "column",
            legendText: "EWR",
            showInLegend: true,
            dataPoints: dataPointsEWR,
            color: "#C13B2E"
          },
          {
            type: "column",
            legendText: "LGA",
            showInLegend: true,
            dataPoints: dataPointsLGA,
            color: "#2EC146"
          },
        ]
      });
      chartFrequency.render();

      let chartStacked = new CanvasJS.Chart("chartContainer2Stacked", {
        animationEnabled: true,
        title: {
          text: "Number of flights per month - stacked"
        },
        axisX: {
          title: "Month",
          interval: 1
        },
        axisY: {
          title: "Number of flights"
        },
        data: [{
          type: "stackedColumn",
          legendText: "JFK",
          showInLegend: true,
          dataPoints: dataPointsJFK,
          color: "#2E86C1"
        },
        {
          type: "stackedColumn",
          legendText: "EWR",
          showInLegend: true,
          dataPoints: dataPointsEWR,
          color: "#C13B2E"
        },
        {
          type: "stackedColumn",
          legendText: "LGA",
          showInLegend: true,
          dataPoints: dataPointsLGA,
          color: "#2EC146"
        },
        ]
      });
      chartStacked.render();

      let chartStackedPercentage = new CanvasJS.Chart("chartContainer2StackedPercentage", {
        animationEnabled: true,
        title: {
          text: "Number of flights per month - stacked percentage"
        },
        axisX: {
          title: "Month",
          interval: 1
        },
        axisY: {
          title: "Number of flights",
          suffix:"%"
        },
        data: [{
          type: "stackedColumn100",
          legendText: "JFK",
          toolTipContent: "{y} (#percent%)",
          showInLegend: true,
          dataPoints: dataPointsJFK,
          color: "#2E86C1"
        },
        {
          type: "stackedColumn100",
          legendText: "EWR",
          toolTipContent: "{y} (#percent%)",
          showInLegend: true,
          dataPoints: dataPointsEWR,
          color: "#C13B2E"
        },
        {
          type: "stackedColumn100",
          legendText: "LGA",
          toolTipContent: "{y} (#percent%)",
          showInLegend: true,
          dataPoints: dataPointsLGA,
          color: "#2EC146"
        },
        ]
      });
      chartStackedPercentage.render();

    }, error => console.error(error));
  }
}


