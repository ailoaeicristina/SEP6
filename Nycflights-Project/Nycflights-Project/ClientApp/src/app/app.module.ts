import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { TotalFlightsComponent } from './flights/total-flights/total-flights.component';
import { MonthlyFlightsComponent } from './flights/monthly-flights/monthly-flights.component';
import { HttpClientModule } from '@angular/common/http';
import { TopDestinationsComponent } from './flights/top-destinations/top-destinations.component';
import { MeanAirTimeComponent } from './flights/mean-air-time/mean-air-time.component';
import { MeanDelayComponent } from './flights/mean-delay/mean-delay.component';
import { AllTemperaturesComponent } from './weather/all-temperatures/all-temperatures.component';
import { DailyMeanTempComponent } from './weather/daily-mean-temp/daily-mean-temp.component';
import { BigManufacturersComponent } from './planes/big-manufacturers/big-manufacturers.component';
import { FlightsPerManufacturerComponent } from './planes/flights-per-manufacturer/flights-per-manufacturer.component';
import { AirbusModelsComponent } from './planes/airbus-models/airbus-models.component';

@NgModule({
    declarations: [
        AppComponent,
        TotalFlightsComponent,
        MonthlyFlightsComponent,
        TopDestinationsComponent,
        MeanAirTimeComponent,
        MeanDelayComponent,
        AllTemperaturesComponent,
        DailyMeanTempComponent,
        BigManufacturersComponent,
        FlightsPerManufacturerComponent,
        AirbusModelsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
