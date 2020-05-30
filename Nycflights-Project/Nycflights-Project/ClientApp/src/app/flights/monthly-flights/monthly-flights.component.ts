import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';
import * as CanvasJS from '../../../assets/canvasjs.min';

@Component({
    selector: 'app-monthly-flights',
    templateUrl: './monthly-flights.component.html',
    styleUrls: ['./monthly-flights.component.css'],
})
export class MonthlyFlightsComponent implements OnInit {
    dataPointsJFK = [];
    dataPointsEWR = [];
    dataPointsLGA = [];

    chartFrequency;
    chartStacked;
    chartStackedPercentage;

    constructor(private flightsService: FlightsService) {}

    ngOnInit(): void {
        this.loadData();
        
    }

    loadData() {
        this.flightsService.getFlightsPerMonthFromJFK().subscribe((dataJFK) => {
            Object.keys(dataJFK).forEach((key) => {
                this.dataPointsJFK.push({ label: key, y: dataJFK[key] });
            });
            this.flightsService.getFlightsPerMonthFromEWR().subscribe((dataEWR) => {
                Object.keys(dataEWR).forEach((key) => {
                    this.dataPointsEWR.push({ label: key, y: dataEWR[key] });
                });
                this.flightsService.getFlightsPerMonthFromLGA().subscribe((dataLGA) => {
                    Object.keys(dataLGA).forEach((key) => {
                        this.dataPointsLGA.push({ label: key, y: dataLGA[key] });
                    });
                    this.createChartFrequency();
                    this.createChartStacked();
                    this.createChartStackedPercentage();

                    this.chartFrequency.render();
                    this.chartStacked.render();
                    this.chartStackedPercentage.render();
                });
                
            });
        });

        

        
    }

    createChartStackedPercentage() {
        this.chartStackedPercentage = new CanvasJS.Chart(
            'chartContainer2StackedPercentage',
            {
                animationEnabled: true,
                title: {
                    text: 'Number of flights per month - stacked percentage',
                },
                axisX: {
                    title: 'Month',
                    interval: 1,
                },
                axisY: {
                    title: 'Number of flights',
                    suffix: '%',
                },
                data: [
                    {
                        type: 'stackedColumn100',
                        legendText: 'JFK',
                        toolTipContent: '{y} (#percent%)',
                        showInLegend: true,
                        dataPoints: this.dataPointsJFK,
                        color: '#2E86C1',
                    },
                    {
                        type: 'stackedColumn100',
                        legendText: 'EWR',
                        toolTipContent: '{y} (#percent%)',
                        showInLegend: true,
                        dataPoints: this.dataPointsEWR,
                        color: '#C13B2E',
                    },
                    {
                        type: 'stackedColumn100',
                        legendText: 'LGA',
                        toolTipContent: '{y} (#percent%)',
                        showInLegend: true,
                        dataPoints: this.dataPointsLGA,
                        color: '#2EC146',
                    },
                ],
            }
        );
    }

    createChartStacked() {
        this.chartStacked = new CanvasJS.Chart('chartContainer2Stacked', {
            animationEnabled: true,
            title: {
                text: 'Number of flights per month - stacked',
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
                    type: 'stackedColumn',
                    legendText: 'JFK',
                    showInLegend: true,
                    dataPoints: this.dataPointsJFK,
                    color: '#2E86C1',
                },
                {
                    type: 'stackedColumn',
                    legendText: 'EWR',
                    showInLegend: true,
                    dataPoints: this.dataPointsEWR,
                    color: '#C13B2E',
                },
                {
                    type: 'stackedColumn',
                    legendText: 'LGA',
                    showInLegend: true,
                    dataPoints: this.dataPointsLGA,
                    color: '#2EC146',
                },
            ],
        });
    }

    createChartFrequency() {
        this.chartFrequency = new CanvasJS.Chart('chartContainer2Frequency', {
            animationEnabled: true,
            title: {
                text: 'Number of flights per month - frequency',
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
                    legendText: 'JFK',
                    showInLegend: true,
                    dataPoints: this.dataPointsJFK,
                    color: '#2E86C1',
                },
                {
                    type: 'column',
                    legendText: 'EWR',
                    showInLegend: true,
                    dataPoints: this.dataPointsEWR,
                    color: '#C13B2E',
                },
                {
                    type: 'column',
                    legendText: 'LGA',
                    showInLegend: true,
                    dataPoints: this.dataPointsLGA,
                    color: '#2EC146',
                },
            ],
        });
    }
}
