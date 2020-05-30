import { Component, OnInit } from '@angular/core';
import { FlightsService } from 'src/app/services/flights.service';

@Component({
    selector: 'app-total-flights',
    templateUrl: './total-flights.component.html',
    styleUrls: ['./total-flights.component.css'],
})
export class TotalFlightsComponent implements OnInit {
    dataPoints = [];

    constructor(private flightsService: FlightsService) {}

    ngOnInit(): void {
        this.loadFlights();
    }

    loadFlights() {
        this.flightsService.getTotalFlightsPerMonth().subscribe((data) => {
            console.log(data);
            Object.keys(data).forEach((key) => {
                this.dataPoints.push({ label: key, y: data[key] });
            });
            
        });
    }
}
