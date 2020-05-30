import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';
import * as CanvasJS from '../../../assets/canvasjs.min';
@Component({
    selector: 'app-total-flights',
    templateUrl: './total-flights.component.html',
    styleUrls: ['./total-flights.component.css'],
})
export class TotalFlightsComponent implements OnInit {
    dataPoints = [];
    chart;

    constructor(private flightsService: FlightsService) {}

    ngOnInit(): void {
        this.loadFlights();
    }

    loadFlights() {
        this.flightsService.getTotalFlightsPerMonth().subscribe((data) => {
            Object.keys(data).forEach((key) => {
                this.dataPoints.push({ label: key, y: data[key] });
            });
            console.log(this.dataPoints);
            this.createChart();
            this.chart.render()
        });
    }

    createChart() {
        this.chart = new CanvasJS.Chart('chartContainer1', {
            animationEnabled: true,
            title: {
                text: 'Number of flights per month',
            },
            axisX: {
                title: 'Month',
                interval: 1,
            },
            axisY: {
                title: 'Number of flights',
            },
            data: [
                {
                    type: 'column',
                    dataPoints: this.dataPoints,
                    color: '#2E86C1',
                },
            ],
        });
    }
}
