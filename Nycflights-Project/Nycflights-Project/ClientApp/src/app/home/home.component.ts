import { Component, AfterViewInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CanvasJS from './canvasjs.min';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html'
})

export class HomeComponent implements AfterViewInit {

  public http: HttpClient;
  public baseUrl: string;

  public flightsToTopTenDestinations: Map<string, number>;
  public meanAirtimeForOrigins: Map<string, string>;
  public weatherObservationsForOrigins: Map<string, number>;
  public meanDepartureAndArrivalDelaysForJFK: Map<string, string>;
  public meanDepartureAndArrivalDelaysForEWR: Map<string, string>;
  public meanDepartureAndArrivalDelaysForLGA: Map<string, string>;
  public manufacturersMoreThanTwoHundredPlanes: Map<string, number>

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  ngAfterViewInit() {

    //Feature 1 - Flights per month
    this.loadFlightsPerMonth();

    //Feature 2 - Flights per month from origins
    this.loadFlightsPerMonthFromOrigins();

    //Feature 3 - Flights to top 10 destinations
    this.loadFlightToTopTenDestinations();

    //Feature 4 - Mean airtime for origins
    this.loadMeanAirtimeForOrigins();

    //Feature 5 - Weather observations for origins
    this.loadWeatherObservationsForOrigins();

    //Feature 6 - Temperature attributes for origins
    this.loadTemperatureAttributesForOrigins();

    //Feature 7 - Temperatures for JFK
    this.loadTemperaturesForJFK();

    //Feature 8 - Daily mean temperature for JFK
    this.loadDailyMeanTemperatureForJFK();

    //Feature 9 - Daily mean temperature for origins
    this.loadDailyMeanTemperatureForOrigins();

    //Feature 10 - Departure and arrival delays for origins
    this.loadDepartureAndArrivalDelaysForOrigins();

    //Feature 11 - Manufacturers with more than 200 planes
    this.loadManufacturersMoreThanTwoHundredPlanes();
  }

  loadFlightsPerMonth() {
    let dataPoints = [];

    let chart = new CanvasJS.Chart("chartContainer1", {
      animationEnabled: true,
      title: {
        text: "Number of flights per month"
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
        dataPoints: dataPoints,
        color: "#2E86C1"
      }]
    });
    chart.render();

    this.http.get<Map<string, number>>(this.baseUrl + 'api/Nycflights/FlightsPerMonth').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPoints.push({ label: key, y: result[key] })
      });
      chart.render();
    }, error => console.error(error));
  }

  loadFlightsPerMonthFromOrigins() {
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

  loadFlightToTopTenDestinations() {

    this.http.get<Map<string, number>>(this.baseUrl + 'api/Nycflights/FlightsToTopTenDestinations').subscribe(result => {
      this.flightsToTopTenDestinations = result;
    }, error => console.error(error));

    let dataPointsJFKToDestinations = [];
    let dataPointsEWRToDestinations = [];
    let dataPointsLGAToDestinations = [];

    let chart = new CanvasJS.Chart("chartContainer3", {
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
    chart.render();

    this.http.get<Map<string, number>>(this.baseUrl + 'api/Nycflights/FlightsToTopTenDestinationsFromJFK').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsJFKToDestinations.push({ label: key, y: result[key] })
      });

      chart.render();
    }, error => console.error(error));

    this.http.get<Map<string, number>>(this.baseUrl + 'api/Nycflights/FlightsToTopTenDestinationsFromEWR').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsEWRToDestinations.push({ label: key, y: result[key] })
      });

      chart.render();
    }, error => console.error(error));

    this.http.get<Map<string, number>>(this.baseUrl + 'api/Nycflights/FlightsToTopTenDestinationsFromLGA').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsLGAToDestinations.push({ label: key, y: result[key] })
      });

      chart.render();
    }, error => console.error(error)); 
  }

  loadMeanAirtimeForOrigins() {
    this.http.get<Map<string, string>>(this.baseUrl + 'api/Nycflights/MeanAirtimeForOrigins').subscribe(result => {
      this.meanAirtimeForOrigins = result;
    }, error => console.error(error));
  }

  loadWeatherObservationsForOrigins() {
    this.http.get<Map<string, number>>(this.baseUrl + 'api/Nycflights/WeatherObservationsForOrigins').subscribe(result => {
      this.weatherObservationsForOrigins = result;
    }, error => console.error(error));
  }

  loadTemperatureAttributesForOrigins() {
    let dataPointsJFK = [];
    let dataPointsEWR = [];
    let dataPointsLGA = [];

    let chart = new CanvasJS.Chart("chartContainer6", {
      animationEnabled: true,
      title: {
        text: "Temperature attributes for origins"
      },
      axisX: {
        title: "Date",
      },
      axisY: {
        title: "Temperature in Celsius"
      },
      data: [{
        type: "scatter",
        legendText: "JFK",
        showInLegend: true,
        dataPoints: dataPointsJFK,
        color: "#2E86C1"
      },
      {
        type: "scatter",
        legendText: "EWR",
        showInLegend: true,
        dataPoints: dataPointsEWR,
        color: "#C13B2E"
      },
      {
        type: "scatter",
        legendText: "LGA",
        showInLegend: true,
        dataPoints: dataPointsLGA,
        color: "#2EC146"
      },
      ]
    });

    chart.render();

    this.http.get<Map<Date, number>>(this.baseUrl + 'api/Nycflights/TemperatureInCelsiusForJFK').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsJFK.push({ label: key, y: result[key] })
      });

      chart.render();
    }, error => console.error(error));

    this.http.get<Map<Date, number>>(this.baseUrl + 'api/Nycflights/TemperatureInCelsiusForEWR').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsEWR.push({ label: key, y: result[key] })
      });

      chart.render();
    }, error => console.error(error));

    this.http.get<Map<Date, number>>(this.baseUrl + 'api/Nycflights/TemperatureInCelsiusForLGA').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsLGA.push({ label: key, y: result[key] })
      });

      chart.render();
    }, error => console.error(error));
  }

  loadTemperaturesForJFK() {
    let dataPointsJFK = [];

    let chart = new CanvasJS.Chart("chartContainer7", {
      animationEnabled: true,
      title: {
        text: "Temperatures registered for JFK"
      },
      axisX: {
        title: "Date",
      },
      axisY: {
        title: "Temperature in Celsius"
      },
      data: [{
        type: "scatter",
        legendText: "JFK",
        showInLegend: true,
        dataPoints: dataPointsJFK,
        color: "#2E86C1"
      }]
    });

    chart.render();

    this.http.get<Map<Date, number>>(this.baseUrl + 'api/Nycflights/TemperatureInCelsiusForJFK').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsJFK.push({ label: key, y: result[key] })
      });

      chart.render();
    }, error => console.error(error));
  }

  loadDailyMeanTemperatureForJFK() {
    let dataPointsJFK = [];

    let chart = new CanvasJS.Chart("chartContainer8", {
      animationEnabled: true,
      title: {
        text: "Daily mean temperature for JFK"
      },
      axisX: {
        title: "Date",
      },
      axisY: {
        title: "Mean temperature"
      },
      data: [{
        type: "scatter",
        legendText: "JFK",
        showInLegend: true,
        dataPoints: dataPointsJFK,
        color: "#2E86C1"
      }]
    });

    chart.render();

    this.http.get<Map<string, number>>(this.baseUrl + 'api/Nycflights/DailyMeanTempInCelsiusForJFK').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsJFK.push({ label: key, y: result[key] })
      });

      chart.render();
    }, error => console.error(error));
  }

  loadDailyMeanTemperatureForOrigins() {
    let dataPointsJFK = [];
    let dataPointsEWR = [];
    let dataPointsLGA = [];

    let chart = new CanvasJS.Chart("chartContainer9", {
      animationEnabled: true,
      title: {
        text: "Daily mean temperature for origins"
      },
      axisX: {
        title: "Date",
      },
      axisY: {
        title: "Mean temperature"
      },
      data: [{
        type: "scatter",
        legendText: "JFK",
        showInLegend: true,
        dataPoints: dataPointsJFK,
        color: "#2E86C1"
      },
      {
        type: "scatter",
        legendText: "EWR",
        showInLegend: true,
        dataPoints: dataPointsEWR,
        color: "#C13B2E"
      },
      {
        type: "scatter",
        legendText: "LGA",
        showInLegend: true,
        dataPoints: dataPointsLGA,
        color: "#2EC146"
      },
      ]
    });

    chart.render();

    this.http.get<Map<string, number>>(this.baseUrl + 'api/Nycflights/DailyMeanTempInCelsiusForJFK').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsJFK.push({ label: key, y: result[key] })
      });

      chart.render();
    }, error => console.error(error));

    this.http.get<Map<string, number>>(this.baseUrl + 'api/Nycflights/DailyMeanTempInCelsiusForEWR').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsEWR.push({ label: key, y: result[key] })
      });

      chart.render();
    }, error => console.error(error));

    this.http.get<Map<string, number>>(this.baseUrl + 'api/Nycflights/DailyMeanTempInCelsiusForLGA').subscribe(result => {

      Object.keys(result).forEach(function (key) {
        dataPointsLGA.push({ label: key, y: result[key] })
      });

      chart.render();
    }, error => console.error(error));
  }

  loadDepartureAndArrivalDelaysForOrigins() {
    this.http.get<Map<string, string>>(this.baseUrl + 'api/Nycflights/MeanDepartureAndArrivalDelayForJFK').subscribe(result => {
      this.meanDepartureAndArrivalDelaysForJFK = result;
    }, error => console.error(error));

    this.http.get<Map<string, string>>(this.baseUrl + 'api/Nycflights/MeanDepartureAndArrivalDelayForEWR').subscribe(result => {
      this.meanDepartureAndArrivalDelaysForEWR = result;
    }, error => console.error(error));

    this.http.get<Map<string, string>>(this.baseUrl + 'api/Nycflights/MeanDepartureAndArrivalDelayForLGA').subscribe(result => {
      this.meanDepartureAndArrivalDelaysForLGA = result;
    }, error => console.error(error));
  }

  loadManufacturersMoreThanTwoHundredPlanes() {
    this.http.get<Map<string, number>>(this.baseUrl + 'api/Nycflights/ManufacturersMoreThanTwoHundredPlanes').subscribe(result => {
      this.manufacturersMoreThanTwoHundredPlanes = result;
    }, error => console.error(error));
  }
}

@Pipe({ name: 'getValues' })
export class GetValuesPipe implements PipeTransform {
  transform(map: Map<string, number>): any[] {
    let ret = [];

    Object.keys(map).forEach(function (key) {
      ret.push({ key: key, val: map[key] })
    });

    return ret;
  }
}


