import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TotalFlightsComponent } from './flights/total-flights/total-flights.component';
import { MonthlyFlightsComponent } from './flights/monthly-flights/monthly-flights.component';
import { TopDestinationsComponent } from './flights/top-destinations/top-destinations.component';
import { MeanAirTimeComponent } from './flights/mean-air-time/mean-air-time.component';
import { MeanDelayComponent } from './flights/mean-delay/mean-delay.component';
import { AllTemperaturesComponent } from './weather/all-temperatures/all-temperatures.component';
import { DailyMeanTempComponent } from './weather/daily-mean-temp/daily-mean-temp.component';
import { BigManufacturersComponent } from './planes/big-manufacturers/big-manufacturers.component';
import { FlightsPerManufacturerComponent } from './planes/flights-per-manufacturer/flights-per-manufacturer.component';
import { AirbusModelsComponent } from './planes/airbus-models/airbus-models.component';

const routes: Routes = [
    { path: 'total-flights', component: TotalFlightsComponent },
    { path: 'monthly-flights', component: MonthlyFlightsComponent },
    { path: 'top-destinations', component: TopDestinationsComponent },
    { path: 'mean-air-time', component: MeanAirTimeComponent },
    { path: 'mean-delay', component: MeanDelayComponent },
    { path: 'all-temperatures', component: AllTemperaturesComponent },
    { path: 'daily-mean-temp', component: DailyMeanTempComponent },
    { path: 'big-manufacturers', component: BigManufacturersComponent },
    {
        path: 'flights-per-manufacturer',
        component: FlightsPerManufacturerComponent,
    },
    { path: 'airbus-models', component: AirbusModelsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
