import { Component, AfterViewInit, Inject } from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html'
})

export class HomeComponent implements AfterViewInit {

  public flightsPerMonth: Map<string, number> = new Map<string, number>();
  public http: HttpClient;
  public baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
    // Feature 1 - Flights per month
    http.get<Map<string, number>>(baseUrl + 'api/Nycflights/FlightsPerMonth').subscribe(result => {

      let dataPoints = [];

      Object.keys(result).forEach(function (key) {
        dataPoints.push({ label: key, y: result[key] })
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

    //Feature 3 - Flights to top 10 destinations
    let dataPointsJFKToDestinations = [];
    http.get<Map<string, number>>(baseUrl + 'api/Nycflights/FlightsToTopTenDestinationsFromJFK').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsJFKToDestinations.push({ label: key, y: result[key] })
      });
    }, error => console.error(error));

    let dataPointsEWRToDestinations = [];
    http.get<Map<string, number>>(baseUrl + 'api/Nycflights/FlightsToTopTenDestinationsFromEWR').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsEWRToDestinations.push({ label: key, y: result[key] })
      });
    }, error => console.error(error));

    let dataPointsLGAToDestinations = [];
    http.get<Map<string, number>>(baseUrl + 'api/Nycflights/FlightsToTopTenDestinationsFromLGA').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsLGAToDestinations.push({ label: key, y: result[key] })
      });

      let chartFrequency = new CanvasJS.Chart("chartContainer3", {
        animationEnabled: true,
        title: {
          text: "Number of flights to top 10 destinations from origins"
        },
        axisX: {
          title: "Destination",
          interval: 1
        },
        axisY: {
          title: "Number of flights"
        },
        data: [{
          type: "column",
          legendText: "JFK",
          showInLegend: true,
          dataPoints: dataPointsJFKToDestinations,
          color: "#2E86C1"
        },
        {
          type: "column",
          legendText: "EWR",
          showInLegend: true,
          dataPoints: dataPointsEWRToDestinations,
          color: "#C13B2E"
        },
        {
          type: "column",
          legendText: "LGA",
          showInLegend: true,
          dataPoints: dataPointsLGAToDestinations,
          color: "#2EC146"
        },
        ]
      });
      chartFrequency.render();

    }, error => console.error(error)); 
  }

  ngAfterViewInit() {
    //Feature 2 - Flights per month from origins
    let dataPointsJFK = [];
    let dataPointsEWR = [];
    let dataPointsLGA = [];

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
        suffix: "%"
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

    chartFrequency.render();
    chartStacked.render();
    chartStackedPercentage.render();

    this.http.get<Map<string, number>>(this.baseUrl + 'api/Nycflights/FlightsPerMonthForJFK').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsJFK.push({ label: key, y: result[key] })
      });

      chartFrequency.render();
      chartStacked.render();
      chartStackedPercentage.render();
    }, error => console.error(error));

    this.http.get<Map<string, number>>(this.baseUrl + 'api/Nycflights/FlightsPerMonthForEWR').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsEWR.push({ label: key, y: result[key] })
      });

      chartFrequency.render();
      chartStacked.render();
      chartStackedPercentage.render();
    }, error => console.error(error));

    this.http.get<Map<string, number>>(this.baseUrl + 'api/Nycflights/FlightsPerMonthForLGA').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsLGA.push({ label: key, y: result[key] })
      });

      chartFrequency.render();
      chartStacked.render();
      chartStackedPercentage.render();
    }, error => console.error(error));
  }
}


